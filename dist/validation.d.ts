import { ValidationRule } from './validationRules';
import { FormousOptions } from './types';
export declare const ValidationRules: {
    [key: string]: ValidationRule;
};
export declare function addCustomValidationRules(customRules: {
    [key: string]: ValidationRule;
}): void;
export declare function validateField(field: HTMLInputElement, options?: FormousOptions, showGlobalErrors?: boolean): boolean;
/**
 * スムーズスクロール機能を提供する関数
 * @param element - スクロール対象のHTML要素
 * @param options - スクロールのオプション設定
 * - offset: スクロール位置の上部からのオフセット（デフォルト: 50px）
 * - behavior: スクロールの動作（'smooth'または'auto'）
 * - duration: スクロールアニメーションの時間（例: '0.5s'）
 */
export declare function smoothScroll(element: HTMLElement, options?: FormousOptions['scrollOptions']): void;
/**
 * フォーム全体のバリデーションを行う関数
 * @param form - バリデーション対象のフォーム要素
 * @param options - バリデーションのオプション設定
 * @returns boolean - バリデーション結果（true: 成功, false: 失敗）
 */
export declare function validateForm(form: HTMLFormElement, options: FormousOptions): boolean;
export declare function Formous(options: FormousOptions): void;
