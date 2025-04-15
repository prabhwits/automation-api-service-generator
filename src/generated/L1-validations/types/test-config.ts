export interface ValidationConfig {
    runAllValidations: boolean;
}

export type validationOutput = {
    valid: boolean;
    code: number;
    description?: string;
}[];

/*
{% comment %} export type ExternalData = {
    _SELF?: string[];
}; {% endcomment %}
*/

export type ExternalData = {};

export type validationInput = {
    payload: any;
    externalData: ExternalData;
    config: ValidationConfig;
};

export type testFunctionArray = Array<
    (input: validationInput) => validationOutput
>;
