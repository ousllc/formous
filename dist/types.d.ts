export type ValidationRule = {
    validate: (value: string, field: HTMLInputElement, options?: FormousOptions) => boolean;
    message: (field: HTMLInputElement, options?: FormousOptions) => string;
};
export interface FormousOptions {
    formSelector: string;
    enableWebflow?: boolean;
    webflowOptions?: {
        preventSubmit?: boolean;
        customSubmit?: (form: HTMLFormElement) => void;
    };
    enableConfirmationPage?: boolean;
    confirmationOptions?: {
        delimiter?: string;
    };
    validationMessages?: {
        required?: string | ((field: HTMLInputElement) => string);
        email?: string | ((field: HTMLInputElement) => string);
        minlength?: string | ((field: HTMLInputElement) => string);
        maxlength?: string | ((field: HTMLInputElement) => string);
        min?: string | ((field: HTMLInputElement) => string);
        max?: string | ((field: HTMLInputElement) => string);
        password?: string | ((field: HTMLInputElement, options?: FormousOptions) => string);
        [key: string]: string | ((field: HTMLInputElement) => string) | undefined;
    };
    validationPatterns?: {
        password?: {
            minLength?: number;
            maxLength?: number;
            requireUppercase?: boolean;
            requireNumber?: boolean;
            requireSymbol?: boolean;
        };
        [key: string]: any;
    };
    customRules?: {
        [key: string]: {
            validate: (value: string, field: HTMLInputElement) => boolean;
            message: (field: HTMLInputElement) => string;
        };
    };
    scrollOptions?: {
        offset?: number;
        behavior?: 'auto' | 'smooth';
        duration?: string;
    };
    stepOptions?: {
        stepSelector?: string;
        progressFillSelector?: string;
        indicatorSelector?: string;
        progressSelector?: string;
        activeClass?: string;
    };
}
