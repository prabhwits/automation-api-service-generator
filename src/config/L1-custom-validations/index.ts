import { validationOutput } from "./types";
import { search } from "./apiTests";
export async function performL1CustomValidations(
  payload: any,
  action: string,
  allErrors = false,
  externalData = {}
): Promise<validationOutput> {
  console.log("Performing custom L1 validations for action: " + action);
  let result: validationOutput = [];
  switch (action) {
    case "search":
      result = search(payload);
      break;
    case "on_search":
      break;

    default:
      break;
  }
  return result;
  return [
    {
      valid: true,
      code: 200,
      description: "Custom validation passed", // description is optional
    },
  ];
}
