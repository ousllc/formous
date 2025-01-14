export type ValidationRule = {
    validate: (value: string, field: HTMLInputElement) => boolean;
    message: (field: HTMLInputElement) => string;
};
export declare const defaultValidationRules: {
    [key: string]: ValidationRule;
};
