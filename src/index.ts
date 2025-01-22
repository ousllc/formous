/**
 * Formousライブラリのメインモジュール
 * フォームのバリデーション、スクロール、ステップ管理などの機能を提供
 */
import { validateField, validateForm, addCustomValidationRules } from './validation';
import { ValidationRule } from './validationRules';
import { initializeStepForm } from './step';
import { FormousOptions } from './types';

// グローバルな型定義を拡張するための宣言
// これにより、windowオブジェクトに新しいプロパティを追加できる
declare global {
  // ブラウザのWindowインターフェースを拡張
  interface Window {
    // FormousInitと同じ型を持つFormousプロパティを追加
    // これにより window.Formous = FormousInit; のような代入が可能になる
    Formous: typeof FormousInit;

    // Webflowプロパティを追加
    // any[]は「どんな型でも許容する配列」を意味する
    // window.Webflow.push() などの操作が可能になる
    Webflow: any[];
  }
}

// 実際の使用例：
// window.Webflow が未定義の場合は空配列で初期化
if (typeof window !== 'undefined') {
  window.Webflow = window.Webflow || [];
}

/**
 * Formousのメイン初期化関数
 * @param options - フォームの設定オプション
 * @returns フォーム操作用のメソッドを含むオブジェクト
 */
const FormousInit = (options: FormousOptions) => {
  const form = document.querySelector(options.formSelector) as HTMLFormElement;
  if (!form) {
    console.error('Form not found');
    return;
  }

  // 初期化時に全てのエラー要素を非表示に
  const errorElements = form.querySelectorAll('[data-validation="error"]');
  errorElements.forEach((element) => {
    (element as HTMLElement).style.display = 'none';
  });

  // 1. カスタムバリデーションの設定
  if (options.customRules) {
    addCustomValidationRules(options.customRules as { [key: string]: ValidationRule });
  }

  // 2. リアルタイムバリデーションの設定
  const fields = form.querySelectorAll('input, textarea, select');
  fields.forEach((field) => {
    field.addEventListener('input', () => validateField(field as HTMLInputElement, options, false));
    field.addEventListener('blur', () => validateField(field as HTMLInputElement, options, false));
  });

  // 3. フォーム送信の設定
  if (options.enableWebflow) {
    // Webflowの場合は初期化後にイベントを設定
    window.Webflow = window.Webflow || [];
    window.Webflow.push(() => {
      // HTML5のvalidationを無効化（重要）
      form.setAttribute('novalidate', 'true');

      form.addEventListener('submit', function(e) {
        const isValid = validateForm(form, options);
        if (!isValid) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        if (options?.webflowOptions?.customSubmit) {
          e.preventDefault();
          e.stopPropagation();
          options.webflowOptions.customSubmit(form);
        }
        // カスタム送信がない場合は、Webflowのデフォルト送信を許可（何もしない）
      });
    });
  } else {
    // Webflow以外の場合
    form.addEventListener('submit', async (e) => {
      const isValid = validateForm(form, options);
      if (!isValid) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      if (options?.webflowOptions?.customSubmit) {
        e.preventDefault();
        e.stopPropagation();
        options.webflowOptions.customSubmit(form);
      }
    });
  }

  // 4. ステップフォームの初期化
  return initializeStepForm(form, options);
}

// グローバル変数として公開
if (typeof window !== 'undefined') {
  window.Formous = FormousInit;
}

// 名前付きエクスポート
export { FormousInit as Formous };
