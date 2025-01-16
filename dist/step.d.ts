import { FormousOptions } from './types';
export declare function initializeStepForm(form: HTMLFormElement, options?: FormousOptions): {
    showStep: (index: number) => void;
    handleNext: () => void;
    handlePrevious: () => void;
    updateProgressBar: () => void;
};
