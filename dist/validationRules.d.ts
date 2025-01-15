import { FormousOptions } from './types';
export type ValidationRule = {
    validate: (value: string, field: HTMLInputElement, options?: FormousOptions) => boolean;
    message: (field: HTMLInputElement, options?: FormousOptions) => string;
};
export declare const defaultValidationRules: {
    [key: string]: ValidationRule;
};
