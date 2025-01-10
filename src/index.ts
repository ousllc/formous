import { validateField, validateForm, addCustomValidationRules } from './validation';
import { initializeStepForm } from './step';

type FormousOptions = {
  formSelector: string;
  customRules?: { [key: string]: { validate: (value: string, field: HTMLInputElement) => boolean; message: (field: HTMLInputElement) => string } };
  enableWebflow?: boolean; // Webflowバリデーションを有効にするフラグ
};

export function Formous(options: FormousOptions) {
  const { formSelector, customRules, enableWebflow } = options;
  const form = document.querySelector(formSelector) as HTMLFormElement;

  if (!form) {
    throw new Error(`Form with selector "${formSelector}" not found.`);
  }

  // カスタムルールを登録
  if (customRules) {
    addCustomValidationRules(customRules);
  }

  const initializeValidation = () => {
    const fields = form.querySelectorAll('input[data-validation]');
    fields.forEach((field) => {
      field.addEventListener('input', () => validateField(field as HTMLInputElement));
      field.addEventListener('blur', () => validateField(field as HTMLInputElement));
    });

    form.addEventListener('submit', (event) => {
      if (!validateForm(form)) {
        event.preventDefault();
        alert('Please fix the errors before submitting.');
      }
    });
  };

  const initializeWebflowValidation = () => {
    if (!enableWebflow) return;

    // Webflow独自のスクリプトを無効化
    form.setAttribute('novalidate', 'true');

    // Webflowのsubmitイベントを制御
    form.addEventListener('submit', (event) => {
      const isValid = validateForm(form);
      if (!isValid) {
        console.log('バリデーション失敗: フォーム送信を中止');
        event.preventDefault();
        event.stopPropagation();
      } else {
        console.log('バリデーション成功: Webflow送信を許可');
      }
    });

    // リアルタイムバリデーションの設定
    const fields = form.querySelectorAll('input, textarea, select');
    fields.forEach((field) => {
      field.addEventListener('input', () => validateField(field as HTMLInputElement));
      field.addEventListener('change', () => validateField(field as HTMLInputElement));
    });
  };

  // 初期化
  initializeValidation();
  const stepForm = initializeStepForm(form);
  initializeWebflowValidation();

  // 必要であれば公開メソッドを返す
  return {
    refreshValidation: initializeValidation,
    ...stepForm,
  };
}

// グローバルスコープに登録
(window as any).Formous = Formous;
