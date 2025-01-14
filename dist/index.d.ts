import { FormousOptions } from './types';
/**
 * Formousのメイン初期化関数
 * @param options - フォームの設定オプション
 * @returns フォーム操作用のメソッドを含むオブジェクト
 */
export declare function Formous(options: FormousOptions): {
    showStep: (index: number) => void;
    handleNext: () => void;
    handlePrevious: () => void;
    updateProgressBar: () => void;
    updateConfirmationPage: (options: FormousOptions) => void;
} | {
    validateForm: () => boolean;
    validateField: (field: HTMLInputElement) => boolean;
} | undefined;
