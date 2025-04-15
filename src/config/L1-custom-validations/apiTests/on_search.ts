import { RedisService } from "ondc-automation-cache-lib";
import { validationOutput } from "../types";


export function onSearch(payload: any): validationOutput {
  const result: validationOutput = [];

  // Check if payload is empty
  if (!payload) {
    result.push({
      valid: false,
      code: 20006,
      description: 'Invalid response - Payload is empty'
    });
    return result;
  }

  // Validate context
  if (!payload.context) {
    result.push({
      valid: false,
      code: 20006,
      description: 'Invalid response - context is required'
    });
  } else {
    validateContext(payload.context, result);
  }

  // Validate message
  if (!payload.message) {
    result.push({
      valid: false,
      code: 20006,
      description: 'Invalid response - message is required'
    });
  } else {
    validateMessage(payload.message, result);
  }

  // If no errors found, add success result
  if (result.length === 0) {
    result.push({
      valid: true,
      code: 200,
      description: 'Payload is valid'
    });
  }

  return result;
}

function validateContext(context: any, result: validationOutput) {
  // Validate required context fields
  const requiredContextFields = [
    'domain', 'country', 'city', 'action', 'core_version',
    'bap_id', 'bap_uri', 'bpp_id', 'bpp_uri',
    'transaction_id', 'message_id', 'timestamp'
  ];

  for (const field of requiredContextFields) {
    if (!context[field]) {
      result.push({
        valid: false,
        code: 20006,
        description: `Invalid response - context.${field} is required`
      });
    }
  }

  // Validate domain
  if (context.domain && context.domain !== 'ONDC:RET11') {
    result.push({
      valid: false,
      code: 20006,
      description: 'Invalid response - context.domain must be "ONDC:RET11"'
    });
  }

  // Validate action
  if (context.action && context.action !== 'on_search') {
    result.push({
      valid: false,
      code: 20006,
      description: 'Invalid response - context.action must be "on_search"'
    });
  }

  // Validate country
  if (context.country && context.country !== 'IND') {
    result.push({
      valid: false,
      code: 20006,
      description: 'Invalid response - context.country must be "IND"'
    });
  }

  // Validate city
  if (context.city) {
    if (context.city.length === 0) {
      result.push({
        valid: false,
        code: 20006,
        description: 'Invalid response - context.city cannot be empty'
      });
    }
    if (context.city === '*') {
      result.push({
        valid: false,
        code: 20006,
        description: "City Code can't be * for on_search request"
      });
    }
  }

  // Validate core_version
  if (context.core_version && !['1.2.0', '1.2.5'].includes(context.core_version)) {
    result.push({
      valid: false,
      code: 20006,
      description: 'Invalid response - context.core_version must be either "1.2.0" or "1.2.5"'
    });
  }

  // Validate URLs
  if (context.bap_uri && !isValidUrl(context.bap_uri)) {
    result.push({
      valid: false,
      code: 20006,
      description: 'Invalid response - context.bap_uri must be a valid URL'
    });
  }

  if (context.bpp_uri && !isValidUrl(context.bpp_uri)) {
    result.push({
      valid: false,
      code: 20006,
      description: 'Invalid response - context.bpp_uri must be a valid URL'
    });
  }

  // Validate timestamp format
  if (context.timestamp && !isValidRFC3339DateTime(context.timestamp)) {
    result.push({
      valid: false,
      code: 20006,
      description: 'Invalid response - context.timestamp must be in RFC3339 date-time format'
    });
  }

  // Validate ttl format
  if (context.ttl && !isValidDuration(context.ttl)) {
    result.push({
      valid: false,
      code: 20006,
      description: 'Invalid response - context.ttl must be in duration format'
    });
  }
}

function validateMessage(message: any, result: validationOutput) {
  if (!message.catalog) {
    result.push({
      valid: false,
      code: 20006,
      description: 'Invalid response - message.catalog is required'
    });
    return;
  }

  validateCatalog(message.catalog, result);
}

function validateCatalog(catalog: any, result: validationOutput) {
  // Validate required catalog fields
  if (!catalog['bpp/providers']) {
    result.push({
      valid: false,
      code: 20006,
      description: 'Invalid response - catalog.bpp/providers is required'
    });
  }

  if (!catalog['bpp/descriptor']) {
    result.push({
      valid: false,
      code: 20006,
      description: 'Invalid response - catalog.bpp/descriptor is required'
    });
  }

  // Validate bpp/descriptor
  if (catalog['bpp/descriptor']) {
    const descriptor = catalog['bpp/descriptor'];
    const requiredDescriptorFields = ['name', 'symbol', 'short_desc', 'long_desc', 'images', 'tags'];
    
    for (const field of requiredDescriptorFields) {
      if (!descriptor[field]) {
        result.push({
          valid: false,
          code: 20006,
          description: `Invalid response - catalog.bpp/descriptor.${field} is required`
        });
      }
    }

    // Validate tags in descriptor
    if (descriptor.tags) {
      validateDescriptorTags(descriptor.tags, result);
    }
  }

  // Validate bpp/providers
  if (catalog['bpp/providers']) {
    const providers = catalog['bpp/providers'];
    
    if (!Array.isArray(providers)){
      result.push({
        valid: false,
        code: 20006,
        description: 'Invalid response - catalog.bpp/providers must be an array'
      });
    } else if (providers.length === 0) {
      result.push({
        valid: false,
        code: 20003,
        description: 'Provider not found - The provider ID provided in the request was not found'
      });
    } else {
      for (const provider of providers) {
        validateProvider(provider, result);
      }
    }
  }

  // Validate bpp/fulfillments if present
  if (catalog['bpp/fulfillments']) {
    const fulfillments = catalog['bpp/fulfillments'];
    
    if (!Array.isArray(fulfillments)) {
      result.push({
        valid: false,
        code: 20006,
        description: 'Invalid response - catalog.bpp/fulfillments must be an array'
      });
    } else {
      for (const fulfillment of fulfillments) {
        validateFulfillment(fulfillment, result);
      }
    }
  }
}

function validateDescriptorTags(tags: any[], result: validationOutput) {
  for (const tag of tags) {
    if (!tag.code || !tag.list) {
      result.push({
        valid: false,
        code: 20006,
        description: 'Invalid response - catalog.bpp/descriptor.tags must have code and list'
      });
      continue;
    }

    if (tag.code === 'bpp_terms') {
      for (const item of tag.list) {
        if (!item.code || !item.value) {
          result.push({
            valid: false,
            code: 20006,
            description: 'Invalid response - catalog.bpp/descriptor.tags.list items must have code and value'
          });
          continue;
        }

        switch (item.code) {
          case 'np_type':
            if (!['MSN', 'ISN'].includes(item.value)) {
              result.push({
                valid: false,
                code: 20006,
                description: 'Invalid response - catalog.bpp/descriptor.tags.list np_type value must be either "MSN" or "ISN"'
              });
            }
            break;
          case 'accept_bap_terms':
            if (!['Y', 'N'].includes(item.value)) {
              result.push({
                valid: false,
                code: 20006,
                description: 'Invalid response - catalog.bpp/descriptor.tags.list accept_bap_terms value must be either "Y" or "N"'
              });
            }
            break;
          case 'collect_payment':
            if (!['Y', 'N'].includes(item.value)) {
              result.push({
                valid: false,
                code: 20006,
                description: 'Invalid response - catalog.bpp/descriptor.tags.list collect_payment value must be either "Y" or "N"'
              });
            }
            break;
        }
      }
    }
  }
}

function validateProvider(provider: any, result: validationOutput) {
  const requiredProviderFields = [
    'id', 'time', 'fulfillments', 'descriptor', '@ondc/org/fssai_license_no',
    'ttl', 'locations', 'categories', 'items', 'tags'
  ];

  for (const field of requiredProviderFields) {
    if (!provider[field]) {
      result.push({
        valid: false,
        code: 20006,
        description: `Invalid response - provider.${field} is required`
      });
    }
  }

  // Validate provider ID
  if (provider.id && typeof provider.id !== 'string') {
    result.push({
      valid: false,
      code: 20006,
      description: 'Invalid response - provider.id must be a string'
    });
  }

  // Validate time
  if (provider.time) {
    if (!provider.time.label || !provider.time.timestamp) {
      result.push({
        valid: false,
        code: 20006,
        description: 'Invalid response - provider.time must have label and timestamp'
      });
    } else {
      if (!['enable', 'disable'].includes(provider.time.label)) {
        result.push({
          valid: false,
          code: 20006,
          description: 'Invalid response - provider.time.label must be either "enable" or "disable"'
        });
      }
      if (!isValidRFC3339DateTime(provider.time.timestamp)) {
        result.push({
          valid: false,
          code: 20006,
          description: 'Invalid response - provider.time.timestamp must be in RFC3339 date-time format'
        });
      }
    }
  }

  // Validate fulfillments
  if (provider.fulfillments) {
    if (!Array.isArray(provider.fulfillments)) {
      result.push({
        valid: false,
        code: 20006,
        description: 'Invalid response - provider.fulfillments must be an array'
      });
    } else {
      for (const fulfillment of provider.fulfillments) {
        validateFulfillment(fulfillment, result);
      }
    }
  }

  // Validate descriptor
  if (provider.descriptor) {
    const requiredDescriptorFields = ['name', 'symbol', 'short_desc', 'long_desc', 'images'];
    for (const field of requiredDescriptorFields) {
      if (!provider.descriptor[field]) {
        result.push({
          valid: false,
          code: 20006,
          description: `Invalid response - provider.descriptor.${field} is required`
        });
      }
    }
  }

  // Validate FSSAI license
  if (provider['@ondc/org/fssai_license_no']) {
    const fssai = provider['@ondc/org/fssai_license_no'];
    if (typeof fssai !== 'string' || fssai.length !== 14) {
      result.push({
        valid: false,
        code: 20006,
        description: 'Invalid response - provider.@ondc/org/fssai_license_no must be exactly 14 characters'
      });
    }
  }

  // Validate ttl
  if (provider.ttl && !isValidDuration(provider.ttl)) {
    result.push({
      valid: false,
      code: 20006,
      description: 'Invalid response - provider.ttl must be in duration format'
    });
  }

  // Validate locations
  if (provider.locations) {
    if (!Array.isArray(provider.locations)) {
      result.push({
        valid: false,
        code: 20006,
        description: 'Invalid response - provider.locations must be an array'
      });
    } else {
      for (const location of provider.locations) {
        validateLocation(location, result);
      }
    }
  }

  // Validate categories
  if (provider.categories) {
    if (!Array.isArray(provider.categories)) {
      result.push({
        valid: false,
        code: 20006,
        description: 'Invalid response - provider.categories must be an array'
      });
    } else {
      for (const category of provider.categories) {
        validateCategory(category, result);
      }
    }
  }

  // Validate items
  if (provider.items) {
    if (!Array.isArray(provider.items)) {
      result.push({
        valid: false,
        code: 20006,
        description: 'Invalid response - provider.items must be an array'
      });
    } else if (provider.items.length === 0) {
      result.push({
        valid: false,
        code: 20005,
        description: 'Item not found - The item ID provided in the request was not found'
      });
    } else {
      for (const item of provider.items) {
        validateItem(item, result);
      }
    }
  }

  // Validate tags
  if (provider.tags) {
    if (!Array.isArray(provider.tags)) {
      result.push({
        valid: false,
        code: 20006,
        description: 'Invalid response - provider.tags must be an array'
      });
    } else {
      for (const tag of provider.tags) {
        validateProviderTag(tag, result);
      }
    }
  }
}

function validateFulfillment(fulfillment: any, result: validationOutput) {
  const requiredFields = ['id', 'type', 'contact'];
  
  for (const field of requiredFields) {
    if (!fulfillment[field]) {
      result.push({
        valid: false,
        code: 20006,
        description: `Invalid response - fulfillment.${field} is required`
      });
    }
  }

  // Validate type
  if (fulfillment.type && !['Delivery', 'Self-Pickup'].includes(fulfillment.type)) {
    result.push({
      valid: false,
      code: 20006,
      description: 'Invalid response - fulfillment.type must be either "Delivery" or "Self-Pickup"'
    });
  }

  // Validate contact
  if (fulfillment.contact) {
    if (!fulfillment.contact.phone || !fulfillment.contact.email) {
      result.push({
        valid: false,
        code: 20006,
        description: 'Invalid response - fulfillment.contact must have phone and email'
      });
    } else {
      if (typeof fulfillment.contact.phone !== 'string' || 
          (fulfillment.contact.phone.length < 10 || fulfillment.contact.phone.length > 11)) {
        result.push({
          valid: false,
          code: 20006,
          description: 'Invalid response - fulfillment.contact.phone must be 10-11 digits'
        });
      }
      if (!isValidEmail(fulfillment.contact.email)) {
        result.push({
          valid: false,
          code: 20006,
          description: 'Invalid response - fulfillment.contact.email must be a valid email'
        });
      }
    }
  }
}

function validateLocation(location: any, result: validationOutput) {
  const requiredFields = ['id', 'time', 'gps', 'address'];
  
  for (const field of requiredFields) {
    if (!location[field]) {
      result.push({
        valid: false,
        code: 20006,
        description: `Invalid response - location.${field} is required`
      });
    }
  }

  // Validate time
  if (location.time) {
    const requiredTimeFields = ['label', 'timestamp', 'days', 'schedule'];
    for (const field of requiredTimeFields) {
      if (!location.time[field]) {
        result.push({
          valid: false,
          code: 20006,
          description: `Invalid response - location.time.${field} is required`
        });
      }
    }

    if (location.time.label && !['enable', 'disable'].includes(location.time.label)) {
      result.push({
        valid: false,
        code: 20006,
        description: 'Invalid response - location.time.label must be either "enable" or "disable"'
      });
    }

    if (location.time.timestamp && !isValidRFC3339DateTime(location.time.timestamp)) {
      result.push({
        valid: false,
        code: 20006,
        description: 'Invalid response - location.time.timestamp must be in RFC3339 date-time format'
      });
    }

    if (location.time.schedule) {
      if (!location.time.schedule.holidays) {
        result.push({
          valid: false,
          code: 20006,
          description: 'Invalid response - location.time.schedule.holidays is required'
        });
      } else if (!Array.isArray(location.time.schedule.holidays)) {
        result.push({
          valid: false,
          code: 20006,
          description: 'Invalid response - location.time.schedule.holidays must be an array'
        });
      } else {
        for (const holiday of location.time.schedule.holidays) {
          if (!isValidDate(holiday)) {
            result.push({
              valid: false,
              code: 20006,
              description: 'Invalid response - location.time.schedule.holidays must be valid dates'
            });
          }
        }
      }
    }
  }

  // Validate address
  if (location.address) {
    const requiredAddressFields = ['locality', 'street', 'city', 'area_code', 'state'];
    for (const field of requiredAddressFields) {
      if (!location.address[field]) {
        result.push({
          valid: false,
          code: 20006,
          description: `Invalid response - location.address.${field} is required`
        });
      }
    }

    if (location.address.area_code && 
        (typeof location.address.area_code !== 'string' || location.address.area_code.length !== 6)) {
      result.push({
        valid: false,
        code: 20006,
        description: 'Invalid response - location.address.area_code must be exactly 6 characters'
      });
    }
  }

  // Validate circle if present
  if (location.circle) {
    if (!location.circle.gps || !location.circle.radius) {
      result.push({
        valid: false,
        code: 20006,
        description: 'Invalid response - location.circle must have gps and radius'
      });
    } else {
      if (location.circle.radius) {
        if (!location.circle.radius.unit || !location.circle.radius.value) {
          result.push({
            valid: false,
            code: 20006,
            description: 'Invalid response - location.circle.radius must have unit and value'
          });
        } else if (location.circle.radius.unit !== 'km') {
          result.push({
            valid: false,
            code: 20006,
            description: 'Invalid response - location.circle.radius.unit must be "km"'
          });
        }
      }
    }
  }
}

function validateCategory(category: any, result: validationOutput) {
  if (!category.id || !category.tags) {
    result.push({
      valid: false,
      code: 20006,
      description: 'Invalid response - category must have id and tags'
    });
  }

  // Validate category ID pattern
  if (category.id && !/^[a-zA-Z0-9-]{1,12}$/.test(category.id)) {
    result.push({
      valid: false,
      code: 20006,
      description: 'Invalid response - category.id should be alphanumeric and up to 12 characters'
    });
  }

  // Validate descriptor if present
  if (category.descriptor && !category.descriptor.name) {
    result.push({
      valid: false,
      code: 20006,
      description: 'Invalid response - category.descriptor.name is required'
    });
  }

  // Validate tags
  if (category.tags) {
    if (!Array.isArray(category.tags)) {
      result.push({
        valid: false,
        code: 20006,
        description: 'Invalid response - category.tags must be an array'
      });
    } else {
      for (const tag of category.tags) {
        if (!tag.code || !tag.list) {
          result.push({
            valid: false,
            code: 20006,
            description: 'Invalid response - category.tags items must have code and list'
          });
        } else {
          for (const item of tag.list) {
            if (!item.code || !item.value) {
              result.push({
                valid: false,
                code: 20006,
                description: 'Invalid response - category.tags.list items must have code and value'
              });
            }
          }
        }
      }
    }
  }
}

function validateItem(item: any, result: validationOutput) {
  const requiredFields = ['id', 'descriptor', 'quantity', 'price', 'category_id', 'tags'];
  
  for (const field of requiredFields) {
    if (!item[field]) {
      result.push({
        valid: false,
        code: 20006,
        description: `Invalid response - item.${field} is required`
      });
    }
  }

  // Validate descriptor
  if (item.descriptor && !item.descriptor.name) {
    result.push({
      valid: false,
      code: 20006,
      description: 'Invalid response - item.descriptor.name is required'
    });
  }

  // Validate quantity
  if (item.quantity) {
    if (!item.quantity.available || !item.quantity.maximum) {
      result.push({
        valid: false,
        code: 20006,
        description: 'Invalid response - item.quantity must have available and maximum'
      });
    } else {
      if (item.quantity.available.count && !['99', '0'].includes(item.quantity.available.count)) {
        result.push({
          valid: false,
          code: 20006,
          description: 'Invalid response - item.quantity.available.count must be either "99" or "0"'
        });
      }

      if (item.quantity.maximum.count && !/^[0-9]+$/.test(item.quantity.maximum.count)) {
        result.push({
          valid: false,
          code: 20006,
          description: 'Invalid response - item.quantity.maximum.count must be a stringified number'
        });
      }

      if (item.quantity.unitized) {
        if (!item.quantity.unitized.measure) {
          result.push({
            valid: false,
            code: 20006,
            description: 'Invalid response - item.quantity.unitized.measure is required'
          });
        } else {
          if (!item.quantity.unitized.measure.unit || !item.quantity.unitized.measure.value) {
            result.push({
              valid: false,
              code: 20006,
              description: 'Invalid response - item.quantity.unitized.measure must have unit and value'
            });
          } else {
            const validUnits = ['unit', 'dozen', 'gram', 'kilogram', 'tonne', 'litre', 'millilitre'];
            if (!validUnits.includes(item.quantity.unitized.measure.unit)) {
              result.push({
                valid: false,
                code: 20006,
                description: `Invalid response - item.quantity.unitized.measure.unit must be one of: ${validUnits.join(', ')}`
              });
            }

            if (!/^[0-9]+(\.[0-9]+)?$/.test(item.quantity.unitized.measure.value)) {
              result.push({
                valid: false,
                code: 20006,
                description: 'Invalid response - item.quantity.unitized.measure.value must be a valid number'
              });
            }
          }
        }
      }
    }
  }

  // Validate price
  if (item.price) {
    if (!item.price.currency || !item.price.value || !item.price.maximum_value) {
      result.push({
        valid: false,
        code: 20006,
        description: 'Invalid response - item.price must have currency, value and maximum_value'
      });
    } else {
      if (item.price.currency !== 'INR') {
        result.push({
          valid: false,
          code: 20006,
          description: 'Invalid response - item.price.currency must be "INR"'
        });
      }

      if (!/^[-+]?[0-9]+(\.[0-9]{1,2})?$/.test(item.price.value)) {
        result.push({
          valid: false,
          code: 20006,
          description: 'Invalid response - item.price.value should be a number in string with up to 2 decimal places'
        });
      }

      if (!/^[0-9]+(\.[0-9]{1,2})?$/.test(item.price.maximum_value)) {
        result.push({
          valid: false,
          code: 20006,
          description: 'Invalid response - item.price.maximum_value should be a number in string with up to 2 decimal places'
        });
      }

      if (item.price.tags) {
        for (const tag of item.price.tags) {
          if (!tag.code || !tag.list) {
            result.push({
              valid: false,
              code: 20006,
              description: 'Invalid response - item.price.tags items must have code and list'
            });
          } else {
            if (!['range', 'default_selection'].includes(tag.code)) {
              result.push({
                valid: false,
                code: 20006,
                description: 'Invalid response - item.price.tags.code must be either "range" or "default_selection"'
              });
            }

            for (const item of tag.list) {
              if (!item.code || !item.value) {
                result.push({
                  valid: false,
                  code: 20006,
                  description: 'Invalid response - item.price.tags.list items must have code and value'
                });
              } else {
                if (!['lower', 'upper', 'value', 'maximum_value'].includes(item.code)) {
                  result.push({
                    valid: false,
                    code: 20006,
                    description: 'Invalid response - item.price.tags.list.code must be one of: lower, upper, value, maximum_value'
                  });
                }

                if (!/^[0-9]+(\.[0-9]{1,2})?$/.test(item.value)) {
                  result.push({
                    valid: false,
                    code: 20006,
                    description: 'Invalid response - item.price.tags.list.value must be a valid number with exactly two decimal places'
                  });
                }
              }
            }
          }
        }
      }
    }
  }

  // Validate category_id (assuming fnbCategories is defined elsewhere)
  // if (item.category_id && !fnbCategories.includes(item.category_id)) {
  //   result.push({
  //     valid: false,
  //     code: 20006,
  //     description: 'Invalid category ID found for item for on_search'
  //   });
  // }

  // Validate category_ids if present
  if (item.category_ids) {
    if (!Array.isArray(item.category_ids)) {
      result.push({
        valid: false,
        code: 20006,
        description: 'Invalid response - item.category_ids must be an array'
      });
    } else {
      for (const categoryId of item.category_ids) {
        if (!/^[a-zA-Z0-9]{1,12}:[a-zA-Z0-9]{1,12}$/.test(categoryId)) {
          result.push({
            valid: false,
            code: 20006,
            description: 'Invalid response - format of category_ids must be followed as per API contract'
          });
        }
      }
    }
  }

  // Validate @ondc/org/time_to_ship if present
  if (item['@ondc/org/time_to_ship'] && 
      !/^PT(?:(?:60|[1-5]?[0-9]|60)M|1H)$/.test(item['@ondc/org/time_to_ship'])) {
    result.push({
      valid: false,
      code: 20006,
      description: 'Invalid response - time to ship should be within PT0M-PT59M or PT1H'
    });
  }

  // Validate tags
  if (item.tags) {
    if (!Array.isArray(item.tags)) {
      result.push({
        valid: false,
        code: 20006,
        description: 'Invalid response - item.tags must be an array'
      });
    } else {
      for (const tag of item.tags) {
        if (!tag.code || !tag.list) {
          result.push({
            valid: false,
            code: 20006,
            description: 'Invalid response - item.tags items must have code and list'
          });
        } else {
          for (const item of tag.list) {
            if (!item.code || !item.value) {
              result.push({
                valid: false,
                code: 20006,
                description: 'Invalid response - item.tags.list items must have code and value'
              });
            }
          }
        }
      }
    }
  }
}

function validateProviderTag(tag: any, result: validationOutput) {
  if (!tag.code || !tag.list) {
    result.push({
      valid: false,
      code: 20006,
      description: 'Invalid response - provider.tags items must have code and list'
    });
    return;
  }

  switch (tag.code) {
    case 'timing':
      validateTimingTag(tag.list, result);
      break;
    case 'serviceability':
      validateServiceabilityTag(tag.list, result);
      break;
    case 'catalog_link':
      validateCatalogLinkTag(tag.list, result);
      break;
    case 'order_value':
      validateOrderValueTag(tag.list, result);
      break;
    default:
      // Validate generic tag structure
      for (const item of tag.list) {
        if (!item.code || !item.value) {
          result.push({
            valid: false,
            code: 20006,
            description: 'Invalid response - provider.tags.list items must have code and value'
          });
        }
      }
  }
}

function validateTimingTag(list: any[], result: validationOutput) {
  const requiredCodes = ['type', 'location', 'day_from', 'day_to', 'time_from', 'time_to'];
  const foundCodes = new Set();

  for (const item of list) {
    if (!item.code || !item.value) {
      result.push({
        valid: false,
        code: 20006,
        description: 'Invalid response - timing tag items must have code and value'
      });
      continue;
    }

    foundCodes.add(item.code);

    switch (item.code) {
      case 'type':
        if (!['Self-Pickup', 'Order', 'Delivery', 'All'].includes(item.value)) {
          result.push({
            valid: false,
            code: 20006,
            description: "Invalid response - timing type must be 'Self-Pickup', 'Order', 'Delivery', or 'All'"
          });
        }
        break;
      case 'location':
        // Just validate it's a string
        if (typeof item.value !== 'string') {
          result.push({
            valid: false,
            code: 20006,
            description: 'Invalid response - timing location must be a string'
          });
        }
        break;
      case 'day_from':
      case 'day_to':
        if (!/^[1-7]$/.test(item.value)) {
          result.push({
            valid: false,
            code: 20006,
            description: `Invalid response - timing ${item.code} must be between 1-7`
          });
        }
        break;
      case 'time_from':
      case 'time_to':
        if (!/^([01][0-9]|2[0-3])[0-5][0-9]$/.test(item.value)) {
          result.push({
            valid: false,
            code: 20006,
            description: `Invalid response - timing ${item.code} must be in HHMM format`
          });
        }
        break;
    }
  }

  // Check if all required codes are present
  for (const code of requiredCodes) {
    if (!foundCodes.has(code)) {
      result.push({
        valid: false,
        code: 20006,
        description: `Invalid response - timing tag must have ${code}`
      });
    }
  }
}

function validateServiceabilityTag(list: any[], result: validationOutput) {
  if (!Array.isArray(list)) {
    result.push({
      valid: false,
      code: 20006,
      description: 'Invalid response - serviceability tag list must be an array'
    });
    return;
  }

  if (list.length < 5 || list.length > 5) {
    result.push({
      valid: false,
      code: 20006,
      description: 'Invalid response - serviceability tag must have exactly 5 items'
    });
  }

  const validCodes = ['location', 'category', 'type', 'val', 'unit'];
  const foundCodes = new Set();

  for (const item of list) {
    if (!item.code || !item.value) {
      result.push({
        valid: false,
        code: 20006,
        description: 'Invalid response - serviceability tag items must have code and value'
      });
      continue;
    }

    if (!validCodes.includes(item.code)) {
      result.push({
        valid: false,
        code: 20006,
        description: `Invalid response - serviceability tag code must be one of: ${validCodes.join(', ')}`
      });
    }

    if (foundCodes.has(item.code)) {
      result.push({
        valid: false,
        code: 20006,
        description: `Invalid response - serviceability tag has duplicate code: ${item.code}`
      });
    }

    foundCodes.add(item.code);
  }

  // Check if all required codes are present
  for (const code of validCodes) {
    if (!foundCodes.has(code)) {
      result.push({
        valid: false,
        code: 20006,
        description: `Invalid response - serviceability tag missing required code: ${code}`
      });
    }
  }
}

function validateCatalogLinkTag(list: any[], result: validationOutput) {
  const requiredCodes = ['type_validity', 'last_update', 'type_value', 'type'];
  const foundCodes = new Set();

  for (const item of list) {
    if (!item.code || !item.value) {
      result.push({
        valid: false,
        code: 20006,
        description: 'Invalid response - catalog_link tag items must have code and value'
      });
      continue;
    }

    foundCodes.add(item.code);

    switch (item.code) {
      case 'type_validity':
        if (!isValidDuration(item.value)) {
          result.push({
            valid: false,
            code: 20006,
            description: 'Invalid response - catalog_link type_validity must be RFC3339 duration'
          });
        }
        break;
      case 'last_update':
        if (!isValidRFC3339DateTime(item.value)) {
          result.push({
            valid: false,
            code: 20006,
            description: 'Invalid response - catalog_link last_update must be RFC3339 UTC timestamp'
          });
        }
        break;
      case 'type_value':
        if (!isValidUrl(item.value)) {
          result.push({
            valid: false,
            code: 20006,
            description: 'Invalid response - catalog_link type_value must be a valid URL'
          });
        }
        break;
      case 'type':
        if (!['inline', 'link'].includes(item.value)) {
          result.push({
            valid: false,
            code: 20006,
            description: "Invalid response - catalog_link type must be 'inline' or 'link'"
          });
        }
        break;
    }
  }

  // Check if all required codes are present
  for (const code of requiredCodes) {
    if (!foundCodes.has(code)) {
      result.push({
        valid: false,
        code: 20006,
        description: `Invalid response - catalog_link tag must have ${code}`
      });
    }
  }
}

function validateOrderValueTag(list: any[], result: validationOutput) {
  let foundMinValue = false;

  for (const item of list) {
    if (!item.code || !item.value) {
      result.push({
        valid: false,
        code: 20006,
        description: 'Invalid response - order_value tag items must have code and value'
      });
      continue;
    }

    if (item.code === 'min_value') {
      foundMinValue = true;
      if (!/^[0-9]+(?:\.[0-9]{1,2})?$/.test(item.value)) {
        result.push({
          valid: false,
          code: 20006,
          description: 'Invalid response - order_value min_value must be number with exactly two decimal places'
        });
      }
    }
  }

  if (!foundMinValue) {
    result.push({
      valid: false,
      code: 20006,
      description: 'Invalid response - order_value tag must have min_value'
    });
  }
}

// Helper functions
function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

function isValidRFC3339DateTime(dateTime: string): boolean {
  // Simplified check - in production use a proper library
  return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/.test(dateTime);
}

function isValidDuration(duration: string): boolean {
  // Simplified check - in production use a proper library
  return /^P(?:\d+Y)?(?:\d+M)?(?:\d+D)?(?:T(?:\d+H)?(?:\d+M)?(?:\d+S)?)?$/.test(duration);
}

function isValidEmail(email: string): boolean {
  // Simplified check - in production use a proper library
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidDate(date: string): boolean {
  // Simplified check - in production use a proper library
  return /^\d{4}-\d{2}-\d{2}$/.test(date);
}