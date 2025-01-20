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

    // チェックボックスのrequired属性チェックを最初に行う
    if (field.type === 'checkbox' && field.hasAttribute('required') && !field.checked) {
        errorsByType['required'] = ValidationRules.required.message(field);
        isValid = false;
    }

    // HTML標準属性のバリデーション
    const standardValidations = [
        { attr: 'required', type: 'required' },
        { attr: 'min', type: 'min' },
        { attr: 'max', type: 'max' },
        { attr: 'minlength', type: 'minLength' },
        { attr: 'maxlength', type: 'maxLength' }
    ];

    // type属性による追加のバリデーション
    const typeValidations = {
        'email': 'email',
        'url': 'url',
        'date': 'date',
        'time': 'time',
        'tel': 'phone',
        'number': 'numeric'
    };

    // type属性のバリデーション
    if (field.type in typeValidations) {
        const validationType = typeValidations[field.type as keyof typeof typeValidations];
        const rule = ValidationRules[validationType];
        if (rule && !rule.validate(field.value, field)) {
            errorsByType[validationType] = rule.message(field);
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
            const result = rule.validate(field.value, field, options);
            if (!result) {
                errorsByType[type] = rule.message(field, options);
                isValid = false;
            }
        }
    });

    // エラーメッセージの表示
    const container = fieldset || field.closest('div');
    if (container) {
        let errorElements: NodeListOf<Element>;
        if (field.type === 'radio') {
            // ラジオボタンの場合は、親または兄弟のエラー要素を探す
            const parent = field.closest('div');
            errorElements = parent?.parentElement?.querySelectorAll('[data-validation="error"]') || 
                container.querySelectorAll('[data-validation="error"]');
        } else {
            errorElements = container.querySelectorAll('[data-validation="error"]');
        }
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

    // エラーが発生している場合のみメッセージを表示
    if (!errorsByType[type]) {
        return '';
    }

    // 優先順位3: data-error-fixed属性がある場合（最優先）
    const errorElement = field.closest('div')?.querySelector(`[data-validation-type="${type}"]`);
    if (errorElement?.hasAttribute('data-error-fixed')) {
        return errorElement.innerHTML;
    }

    // 優先順位2: オプションで指定されたメッセージ
    const optionMessage = options?.validationMessages?.[type];
    if (optionMessage) {
        if (typeof optionMessage === 'function') {
            const message = (optionMessage as (field: HTMLInputElement) => string)(field);
            return message;
        }
        return optionMessage as string;
    }

    // 優先順位1: ValidationRulesのメッセージ（最後）
    return errorsByType[type];
}

// エラー要素の更新を行うヘルパー関数
function updateErrorElements(elements: NodeListOf<Element>, errorsByType: { [key: string]: string }, field: HTMLInputElement, options?: FormousOptions) {
    const hasErrors = Object.keys(errorsByType).length > 0;

    elements.forEach(errorElement => {
        const targetType = errorElement.getAttribute('data-validation-type');
        const element = errorElement as HTMLElement;
        const hasInnerText = element.innerHTML.trim();
        const isFixed = element.hasAttribute('data-error-fixed');

        if (!targetType) {
            // data-validation-typeがない場合の処理
            if (hasErrors) {
                // エラーが1つ以上ある場合
                const firstErrorType = Object.keys(errorsByType)[0];
                const message = getErrorMessage(firstErrorType, field, errorsByType, options);
                
                if (!isFixed) {
                    const optionMessage = options?.validationMessages?.[firstErrorType];
                    if (optionMessage || !hasInnerText) {
                        element.innerHTML = message;
                    }
                }
                element.style.display = 'block';
            } else {
                element.style.display = 'none';
            }
            return;
        }

        // data-validation-typeがある場合の既存の処理
        const message = getErrorMessage(targetType, field, errorsByType, options);
        if (isFixed) {
            element.style.display = errorsByType[targetType] ? 'block' : 'none';
            return;
        }

        const optionMessage = options?.validationMessages?.[targetType];
        if (optionMessage) {
            element.innerHTML = message;
        } else if (hasInnerText) {
        } else {
            element.innerHTML = message;
        }
        element.style.display = errorsByType[targetType] ? 'block' : 'none';
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

    // スクロールアニメーションの設定
    document.documentElement.style.setProperty('scroll-behavior', behavior);
    document.documentElement.style.setProperty('transition-duration', duration);

    // 要素の上部マージンを設定してスクロール位置を調整
    element.style.scrollMargin = `${offset}px`;

    // スクロール開始前の位置を記録
    const startPosition = window.scrollY;

    // 要素が既に表示されているかチェック
    const rect = element.getBoundingClientRect();
    const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;

    if (isVisible) {
        // 既に見えている場合は直接フォーカス
        element.focus();
        return;
    }

    // 要素まで滑らかにスクロール
    element.scrollIntoView({
        behavior,
        block: 'nearest',
        inline: 'nearest'
    });

    // スクロールの完了を監視
    let lastPosition = window.scrollY;
    const checkScrollEnd = () => {
        const currentPosition = window.scrollY;

        // スクロールが完了したかチェック
        if (currentPosition === lastPosition && currentPosition !== startPosition) {
            // スクロールが完了し、かつ位置が変わっている場合
            // CSSプロパティをリセット
            document.documentElement.style.removeProperty('scroll-behavior');
            document.documentElement.style.removeProperty('transition-duration');
            element.focus();
            return;
        }

        // まだスクロール中
        lastPosition = currentPosition;
        requestAnimationFrame(checkScrollEnd);
    };

    requestAnimationFrame(checkScrollEnd);
}

/**
 * フォーム全体のバリデーションを行う関数
 * @param form - バリデーション対象のフォーム要素
 * @param options - バリデーションのオプション設定
 * @returns boolean - バリデーション結果（true: 成功, false: 失敗）
 */
export function validateForm(form: HTMLFormElement, options?: FormousOptions): boolean {
    const fields = form.querySelectorAll('input, textarea, select');
    let isValid = true;

    fields.forEach((field) => {
        if (!validateField(field as HTMLInputElement, options)) {
            if (isValid) {  // 最初のエラーフィールドの場合のみスクロール
                const errorField = field as HTMLElement;
                smoothScroll(errorField, options?.scrollOptions);
            }
            isValid = false;
        }
    });

    return isValid;
}

export function Formous(options: FormousOptions) {

    const form = document.querySelector(options.formSelector) as HTMLFormElement;
    if (!form) {
        console.error('Form not found');
        return;
    }

    // ステップ3: クリックイベントの設定
    form.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        
        // ボタンクリックの確認
        if (target.hasAttribute('data-action')) {
            
            event.preventDefault();
            const action = target.getAttribute('data-action');
            
            // 現在のステップを取得
            const currentStep = target.closest('.step');
            if (!currentStep) {
                console.error('Current step not found');
                return;
            }

            // すべてのステップを取得
            const steps = Array.from(form.querySelectorAll('.step'));
            const currentIndex = steps.indexOf(currentStep);

            // アクションの処理
            if (action === 'next') {
                if (currentIndex < steps.length - 1) {
                    // 現在のステップを非表示
                    currentStep.classList.remove('active');
                    (currentStep as HTMLElement).style.display = 'none';
                    
                    // 次のステップを表示
                    const nextStep = steps[currentIndex + 1];
                    nextStep.classList.add('active');
                    (nextStep as HTMLElement).style.display = 'block';
                    
                }
            }
        }
    });

}
