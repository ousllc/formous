import { validateField, validateForm, addCustomValidationRules } from './validation';
import { initializeStepForm } from './step';
import { FormousOptions } from './types';

// Formous関数 - フォームバリデーションとステップ管理の初期化
export function Formous(options: FormousOptions) {
  const form = document.querySelector(options.formSelector) as HTMLFormElement;
  if (!form) {
    console.error('Form not found');
    return;
  }

  // カスタムルールを登録
  if (options.customRules) {
    addCustomValidationRules(options.customRules);
  }

  // Webflow用の設定
  if (options.enableWebflow) {
    // Webflowのデフォルトバリデーションを無効化
    form.setAttribute('data-wf-page', '');
    form.setAttribute('novalidate', 'true');

    // リアルタイムバリデーション
    const fields = form.querySelectorAll('input, textarea, select');
    fields.forEach((field) => {
      field.addEventListener('input', () => validateField(field as HTMLInputElement, options));
      field.addEventListener('blur', () => validateField(field as HTMLInputElement, options));
    });
  }

  // フォームのsubmitイベントを処理
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // フォーム全体のバリデーション
    const isValid = validateForm(form, options);
    if (!isValid) {
      return;
    }

    if (options.webflowOptions?.preventSubmit) {
      const formData = new FormData(form);
      try {
        if (options.webflowOptions.customSubmit) {
          await options.webflowOptions.customSubmit(form);
        } else {
          // Webflowのデフォルトの送信処理
          const action = form.getAttribute('action');
          if (action) {
            const response = await fetch(action, {
              method: 'POST',
              body: formData
            });
            if (response.ok) {
              const redirect = form.getAttribute('data-wf-redirect');
              if (redirect) {
                window.location.href = redirect;
              }
            }
          }
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  });

  // ステップフォームの初期化
  if (options.enableConfirmationPage) {
    return initializeStepForm(form, true, options);
  }

  return {
    validateForm: () => validateForm(form, options),
    validateField: (field: HTMLInputElement) => validateField(field, options)
  };
}

// グローバルスコープにFormousを登録（必要に応じて削除可能）
(window as any).Formous = Formous;
