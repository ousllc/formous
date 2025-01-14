import { FormousOptions } from './types';
export declare function initializeStepForm(form: HTMLFormElement, enableConfirmationPage?: boolean, options?: FormousOptions): {
    showStep: (index: number) => void;
    handleNext: () => void;
    handlePrevious: () => void;
    updateProgressBar: () => void;
    updateConfirmationPage: (options: FormousOptions) => void;
};
