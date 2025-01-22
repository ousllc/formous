import { FormousOptions } from './types';
export type ValidationRule = {
    validate: (value: string, field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement, options?: FormousOptions) => boolean;
    message: (field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement, options?: FormousOptions) => string;
};
export declare const defaultValidationRules: {
    [key: string]: ValidationRule;
};
