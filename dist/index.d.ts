import { FormousOptions } from './types';
declare global {
    interface Window {
        Formous: typeof FormousInit;
        Webflow: any[];
    }
}
/**
 * Formousのメイン初期化関数
 * @param options - フォームの設定オプション
 * @returns フォーム操作用のメソッドを含むオブジェクト
 */
declare const FormousInit: (options: FormousOptions) => {
    showStep: (index: number) => void;
    handleNext: () => void;
    handlePrevious: () => void;
    updateProgressBar: () => void;
} | {
    validateForm: () => boolean;
    validateField: (field: HTMLInputElement) => boolean;
} | undefined;
export { FormousInit as Formous };
