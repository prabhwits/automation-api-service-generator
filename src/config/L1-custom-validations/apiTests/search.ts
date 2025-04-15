import { RedisService } from "ondc-automation-cache-lib";
import { validationOutput } from "../types";
import { validate as uuidValidate } from "uuid";
import { isURL } from "validator";

export function search(payload: any): validationOutput {
  const result: validationOutput = [];

  // Helper function to add validation errors
  const addError = (code: number, description: string) => {
    result.push({ valid: false, code, description });
  };

  // Check if payload exists
  if (!payload) {
    addError(40000, "Payload is missing");
    return result;
  }

  // Validate context
  if (!payload.context) {
    addError(40000, "context is required");
  } else {
    const context = payload.context;

    // Check required context fields
    const requiredContextFields = [
      "domain",
      "action",
      "country",
      "city",
      "core_version",
      "bap_id",
      "bap_uri",
      "transaction_id",
      "message_id",
      "timestamp",
      "ttl",
    ];

    for (const field of requiredContextFields) {
      if (!context[field]) {
        addError(40000, `context.${field} is required`);
      }
    }

    // Validate specific context fields
    if (context.action && context.action !== "search") {
      addError(40000, 'context.action must be "search"');
    }

    if (
      context.core_version &&
      !["1.2.0", "1.2.5"].includes(context.core_version)
    ) {
      addError(40000, 'context.core_version must be either "1.2.0" or "1.2.5"');
    }

    if (context.bap_uri && !isURL(context.bap_uri)) {
      addError(40000, "context.bap_uri must be a valid URL");
    }

    if (context.timestamp && !isValidRFC3339(context.timestamp)) {
      addError(40000, "context.timestamp must be in RFC3339 format");
    }

    if (context.ttl && !isValidDuration(context.ttl)) {
      addError(40000, "context.ttl must be in ISO 8601 duration format");
    }
  }

  // Validate message
  if (!payload.message) {
    addError(40000, "message is required");
  } else {
    const message = payload.message;

    if (!message.intent) {
      addError(40000, "message.intent is required");
    } else {
      const intent = message.intent;

      // Validate payment
      if (!intent.payment) {
        addError(40000, "intent.payment is required");
      } else {
        const payment = intent.payment;

        if (!payment["@ondc/org/buyer_app_finder_fee_type"]) {
          addError(
            40000,
            "payment.@ondc/org/buyer_app_finder_fee_type is required"
          );
        } else if (
          payment["@ondc/org/buyer_app_finder_fee_type"] !== "percent"
        ) {
          addError(
            40000,
            'payment.@ondc/org/buyer_app_finder_fee_type must be "percent"'
          );
        }

        if (!payment["@ondc/org/buyer_app_finder_fee_amount"]) {
          addError(
            40000,
            "payment.@ondc/org/buyer_app_finder_fee_amount is required"
          );
        } else if (
          !/^(\d*.?\d{1,2})$/.test(
            payment["@ondc/org/buyer_app_finder_fee_amount"]
          )
        ) {
          addError(
            40000,
            "payment.@ondc/org/buyer_app_finder_fee_amount must be a valid decimal number"
          );
        }
      }

      // Validate fulfillment if present
      if (intent.fulfillment) {
        const fulfillment = intent.fulfillment;

        if (
          fulfillment.type &&
          !["Delivery", "Self-Pickup", "Buyer-Delivery"].includes(
            fulfillment.type
          )
        ) {
          addError(
            40000,
            "fulfillment.type must be one of: Delivery, Self-Pickup, Buyer-Delivery"
          );
        }

        if (fulfillment.end) {
          if (!fulfillment.end.location) {
            addError(40000, "fulfillment.end.location is required");
          } else {
            const location = fulfillment.end.location;

            if (!location.gps) {
              addError(40000, "location.gps is required");
            }

            if (!location.address) {
              addError(40000, "location.address is required");
            } else if (!location.address.area_code) {
              addError(40000, "location.address.area_code is required");
            }
          }
        }
      }

      // Validate item if present
      if (intent.item) {
        if (!intent.item.descriptor) {
          addError(40000, "item.descriptor is required");
        } else if (!intent.item.descriptor.name) {
          addError(40000, "item.descriptor.name is required");
        }
      }

      // Validate category if present
      if (intent.category && !intent.category.id) {
        addError(40000, "category.id is required");
      }

      // Validate tags if present
      if (intent.tags) {
        if (!Array.isArray(intent.tags)) {
          addError(40000, "tags must be an array");
        } else if (intent.tags.length === 0) {
          addError(40000, "tags must contain at least one item");
        } else {
          const validTagCodes = [
            "bnp_features",
            "catalog_full",
            "catalog_inc",
            "bap_terms",
          ];
          let hasValidTag = false;

          for (const tag of intent.tags) {
            if (!tag.code) {
              addError(40000, "tag.code is required");
              continue;
            }

            if (!validTagCodes.includes(tag.code)) {
              addError(
                40000,
                `tag.code must be one of: ${validTagCodes.join(", ")}`
              );
              continue;
            }

            if (!tag.list) {
              addError(40000, "tag.list is required");
              continue;
            }

            if (!Array.isArray(tag.list) || tag.list.length === 0) {
              addError(40000, "tag.list must be a non-empty array");
              continue;
            }

            hasValidTag = true;

            // Validate specific tag requirements
            if (tag.code === "bnp_features") {
              const has000 = tag.list.some((item: any) => item.code === "000");
              if (!has000) {
                addError(40000, 'bnp_features tag must contain code "000"');
              }
            } else if (tag.code === "catalog_full") {
              const payloadType = tag.list.find(
                (item: any) => item.code === "payload_type"
              );
              if (!payloadType) {
                addError(
                  40000,
                  'catalog_full tag must contain code "payload_type"'
                );
              } else if (!["link", "inline"].includes(payloadType.value)) {
                addError(
                  40000,
                  'payload_type value must be either "link" or "inline"'
                );
              }
            } else if (tag.code === "catalog_inc") {
              const hasMode = tag.list.some(
                (item: any) => item.code === "mode"
              );
              const hasStartTime = tag.list.some(
                (item: any) => item.code === "start_time"
              );
              const hasEndTime = tag.list.some(
                (item: any) => item.code === "end_time"
              );

              if (!hasMode && !(hasStartTime && hasEndTime)) {
                addError(
                  40000,
                  'catalog_inc tag must contain either "mode" or both "start_time" and "end_time"'
                );
              }
            } else if (tag.code === "bap_terms") {
              const hasStaticTerms = tag.list.some(
                (item: any) => item.code === "static_terms"
              );
              const hasStaticTermsNew = tag.list.some(
                (item: any) => item.code === "static_terms_new"
              );
              const hasEffectiveDate = tag.list.some(
                (item: any) => item.code === "effective_date"
              );

              if (!hasStaticTerms || !hasStaticTermsNew || !hasEffectiveDate) {
                addError(
                  40000,
                  'bap_terms tag must contain "static_terms", "static_terms_new", and "effective_date"'
                );
              }
            }

            // Validate list items
            for (const item of tag.list) {
              if (!item.code) {
                addError(40000, "tag.list item code is required");
              }
              if (!item.value) {
                addError(40000, "tag.list item value is required");
              }
            }
          }

          if (!hasValidTag) {
            addError(40000, "tags must contain at least one valid tag");
          }
        }
      }
    }
  }

  // If no errors found, add a success result
  if (result.length === 0) {
    result.push({ valid: true, code: 200 });
  }

  return result;
}

// Helper functions for validation
function isValidRFC3339(dateString: string): boolean {
  try {
    return !isNaN(Date.parse(dateString));
  } catch (e) {
    return false;
  }
}

function isValidDuration(duration: string): boolean {
  // Simple check for ISO 8601 duration format
  return /^P(?:\d+(?:\.\d+)?Y)?(?:\d+(?:\.\d+)?M)?(?:\d+(?:\.\d+)?W)?(?:\d+(?:\.\d+)?D)?(?:T(?:\d+(?:\.\d+)?H)?(?:\d+(?:\.\d+)?M)?(?:\d+(?:\.\d+)?S)?)?$/.test(
    duration
  );
}
