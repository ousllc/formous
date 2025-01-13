export type ValidationRule = {
    validate: (value: string, field: HTMLInputElement) => boolean;
    message: (field: HTMLInputElement) => string;
};

export type FormousOptions = {
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
        [key: string]: string | ((field: HTMLInputElement) => string) | undefined;
    };
    
    customRules?: {
        [key: string]: {
            validate: (value: string, field: HTMLInputElement) => boolean;
            message: (field: HTMLInputElement) => string;
        };
    };
}; 