// バリデーションルールの型定義とデフォルトルールのインポート
import { defaultValidationRules, ValidationRule } from './validationRules';
// FormousOptionsをインポートする
import { FormousOptions } from './types';

// デフォルトのバリデーションルールを複製して、必要に応じてカスタムルールを追加
export const ValidationRules: { [key: string]: ValidationRule } = { ...defaultValidationRules };

// カスタムルールを登録するための関数
export function addCustomValidationRules(customRules: { [key: string]: ValidationRule }) {
    // カスタムルールを既存のルールにマージ
    Object.assign(ValidationRules, customRules);
}

// 単一のフィールドをバリデートする関数
export function validateField(field: HTMLInputElement, options?: FormousOptions, showGlobalErrors: boolean = false): boolean {
    const fieldset = field.closest('fieldset[data-validation]');
    let isValid = true;
    let errorsByType: { [key: string]: string | ((field: HTMLInputElement) => string) } = {};

    // HTML標準属性のバリデーション
    const standardValidations = [
        { attr: 'required', type: 'required' },
        { attr: 'min', type: 'min' },
        { attr: 'max', type: 'max' },
        { attr: 'minlength', type: 'minLength' },
        { attr: 'maxlength', type: 'maxLength' }
    ];

    // type属性による追加のバリデーション
    if (field.type === 'email') {
        const rule = ValidationRules['email'];
        if (rule && !rule.validate(field.value, field)) {
            errorsByType['email'] = rule.message(field);
            isValid = false;
        }
    }

    standardValidations.forEach(validation => {
        if (field.hasAttribute(validation.attr)) {
            const rule = ValidationRules[validation.type];
            if (rule && !rule.validate(field.value, field)) {
                // ここでオプションのメッセージを使用
                const optionMessage = options?.validationMessages?.[validation.type];
                const message = typeof rule.message === 'function' ? rule.message(field) : rule.message;
                errorsByType[validation.type] = optionMessage || message;
                isValid = false;
            }
        }
    });

    // data-validationによるバリデーション
    const validationTypes = fieldset 
        ? fieldset.getAttribute('data-validation')?.split(' ') || []
        : field.getAttribute('data-validation')?.split(' ') || [];

    validationTypes.forEach(type => {
        const rule = ValidationRules[type];
        if (rule) {
            const result = rule.validate(field.value, field);
            if (!result) {
                errorsByType[type] = rule.message(field);
                isValid = false;
            }
        }
    });

    // エラーメッセージの表示
    const container = fieldset || field.closest('div');
    if (container) {
        const errorElements = container.querySelectorAll('[data-validation="error"]');
        updateErrorElements(errorElements, errorsByType as { [key: string]: string }, field, options);
    }

    // data-validation-for属性を持つ離れた場所のエラー要素を探して更新
    const fieldName = field.getAttribute('name');
    if (fieldName) {
        const remoteErrorElements = document.querySelectorAll(`[data-validation="error"][data-validation-for="${fieldName}"]`);
        const globalErrorContainer = document.querySelector('[data-validation-error-global]');
        
        // グローバルエラーの表示制御
        if (showGlobalErrors || globalErrorContainer?.classList.contains('active')) {
            updateErrorElements(remoteErrorElements, errorsByType as { [key: string]: string }, field, options);
        }

        // グローバルエラーコンテナの表示制御
        const hasVisibleErrors = Array.from(remoteErrorElements).some(
            el => (el as HTMLElement).style.display === 'block'
        );
        globalErrorContainer?.classList.toggle('active', hasVisibleErrors);
    }

    return isValid;
}

function getErrorMessage(type: string, field: HTMLInputElement, errorsByType: { [key: string]: string }, options?: FormousOptions): string {
    console.log('Debug getErrorMessage:', {
        type,
        errorsByType,
        hasError: errorsByType[type],
        options,
        validationMessages: options?.validationMessages,
        optionMessage: options?.validationMessages?.[type]
    });

    // エラーが発生している場合のみメッセージを表示
    if (!errorsByType[type]) {
        return '';
    }

    // 優先順位3: data-error-fixed属性がある場合（最優先）
    const errorElement = field.closest('div')?.querySelector(`[data-validation-type="${type}"]`);
    if (errorElement?.hasAttribute('data-error-fixed')) {
        console.log('Using fixed message:', errorElement.innerHTML);
        return errorElement.innerHTML;
    }

    // 優先順位2: オプションで指定されたメッセージ
    const optionMessage = options?.validationMessages?.[type];
    if (optionMessage) {
        console.log('Using option message:', optionMessage);
        if (typeof optionMessage === 'function') {
            const message = (optionMessage as (field: HTMLInputElement) => string)(field);
            console.log('Function message result:', message);
            return message;
        }
        return optionMessage as string;
    }

    // 優先順位1: ValidationRulesのメッセージ（最後）
    console.log('Using default message:', errorsByType[type]);
    return errorsByType[type];
}

// エラー要素の更新を行うヘルパー関数
function updateErrorElements(elements: NodeListOf<Element>, errorsByType: { [key: string]: string }, field: HTMLInputElement, options?: FormousOptions) {
    elements.forEach(errorElement => {
        const targetType = errorElement.getAttribute('data-validation-type');
        if (targetType && Object.keys(errorsByType).length > 0) {
            const message = getErrorMessage(targetType, field, errorsByType, options);
            if (!errorElement.hasAttribute('data-error-fixed')) {
                (errorElement as HTMLElement).innerHTML = message;
            }
            (errorElement as HTMLElement).style.display = errorsByType[targetType] ? 'block' : 'none';
        }
    });
}

/**
 * スムーズスクロール機能を提供する関数
 * @param element - スクロール対象のHTML要素
 * @param options - スクロールのオプション設定
 * - offset: スクロール位置の上部からのオフセット（デフォルト: 50px）
 * - behavior: スクロールの動作（'smooth'または'auto'）
 * - duration: スクロールアニメーションの時間（例: '0.5s'）
 */
export function smoothScroll(element: HTMLElement, options: FormousOptions['scrollOptions'] = {}) {
    const {
        offset = 50,
        behavior = 'smooth',
        duration = '0.5s'
    } = options;

    // CSSプロパティを一時的に設定してスクロール動作をカスタマイズ
    document.documentElement.style.setProperty('scroll-behavior', behavior);
    document.documentElement.style.setProperty('transition-duration', duration);
    document.documentElement.style.setProperty('scroll-timeline-name', 'scroll');

    // 要素の上部マージンを設定してスクロール位置を調整
    element.style.scrollMargin = `${offset}px`;

    // 要素まで滑らかにスクロール
    element.scrollIntoView({
        behavior,
        block: 'nearest',  // 最も近い位置にスクロール
        inline: 'nearest'
    });

    // スクロールアニメーション完了後の処理
    setTimeout(() => {
        // 一時的なCSSプロパティを削除
        document.documentElement.style.removeProperty('scroll-behavior');
        document.documentElement.style.removeProperty('transition-duration');
        document.documentElement.style.removeProperty('scroll-timeline-name');

        // スクロール完了後、少し遅延を入れてからフォーカスを設定
        setTimeout(() => {
            element.focus();
        }, 2000);
    }, parseFloat(duration) * 1000);
}

/**
 * フォーム全体のバリデーションを行う関数
 * @param form - バリデーション対象のフォーム要素
 * @param options - バリデーションのオプション設定
 * @returns boolean - バリデーション結果（true: 成功, false: 失敗）
 */
export function validateForm(form: HTMLFormElement, options: FormousOptions): boolean {
    const fields = form.querySelectorAll('input, textarea, select');
    let isValid = true;
    let firstErrorField: HTMLElement | null = null;

    // 各フィールドのバリデーション
    fields.forEach((field) => {
        const fieldValid = validateField(field as HTMLInputElement, options, true);  // フォーム送信時はグローバルエラーを表示
        if (!fieldValid) {
            isValid = false;
            // 最初のエラーフィールドを記録（スクロール用）
            if (!firstErrorField) {
                firstErrorField = field as HTMLElement;
            }
        }
    });

    // エラーがある場合、最初のエラーフィールドまでスクロール
    if (!isValid && firstErrorField) {
        setTimeout(() => {
            if (firstErrorField) {
                smoothScroll(firstErrorField, options.scrollOptions);
            }
        }, 0);
    }

    return isValid;
}

export function Formous(options: FormousOptions) {
    console.log('1. Formous initialization started');  // ステップ1: 初期化開始

    const form = document.querySelector(options.formSelector) as HTMLFormElement;
    if (!form) {
        console.error('Form not found');
        return;
    }
    console.log('2. Form found:', form);  // ステップ2: フォーム発見

    // ステップ3: クリックイベントの設定
    form.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        
        // ボタンクリックの確認
        if (target.hasAttribute('data-action')) {
            console.log('3. Action button clicked:', {
                action: target.getAttribute('data-action'),
                element: target
            });
            
            event.preventDefault();
            const action = target.getAttribute('data-action');
            
            // 現在のステップを取得
            const currentStep = target.closest('.step');
            if (!currentStep) {
                console.error('Current step not found');
                return;
            }
            console.log('4. Current step:', currentStep);

            // すべてのステップを取得
            const steps = Array.from(form.querySelectorAll('.step'));
            const currentIndex = steps.indexOf(currentStep);
            console.log('5. Current index:', currentIndex);

            // アクションの処理
            if (action === 'next' || action === 'confirm') {
                console.log('6. Processing next/confirm action');
                if (currentIndex < steps.length - 1) {
                    // 現在のステップを非表示
                    currentStep.classList.remove('active');
                    (currentStep as HTMLElement).style.display = 'none';
                    
                    // 次のステップを表示
                    const nextStep = steps[currentIndex + 1];
                    nextStep.classList.add('active');
                    (nextStep as HTMLElement).style.display = 'block';
                    
                    console.log('7. Moved to next step:', nextStep);
                }
            }
        }
    });

    console.log('8. Event listener setup completed');
}
