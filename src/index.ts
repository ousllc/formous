/**
 * Formousライブラリのメインモジュール
 * フォームのバリデーション、スクロール、ステップ管理などの機能を提供
 */
import { validateField, validateForm, addCustomValidationRules, smoothScroll } from './validation';
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
  // Webflow統合モードの場合
  if (options.enableWebflow) {
    // window.Webflow.push() は Webflowの機能
    // DOMContentLoaded後に実行されることが保証される
    // コールバック関数として initializeFormous を登録
    window.Webflow.push(() => {
      initializeFormous(options);
    });
    return;  // Webflowモードでは即時実行せずにreturn
  }

  // 通常モードの場合（Webflow統合なし）
  // 即時実行してその結果を返す
  return initializeFormous(options);
}

/**
 * フォームの実際の初期化処理を行う内部関数
 * @param options - フォームの設定オプション
 * @returns フォーム操作用のメソッドを含むオブジェクト
 */
function initializeFormous(options: FormousOptions) {
  const form = document.querySelector(options.formSelector) as HTMLFormElement;
  if (!form) {
    console.error('Form not found');
    return;
  }

  // カスタムバリデーションルールの登録
  if (options.customRules) {
    addCustomValidationRules(options.customRules);
  }

  // リアルタイムバリデーションの設定
  const fields = form.querySelectorAll('input, textarea, select');
  fields.forEach((field) => {
    field.addEventListener('input', () => validateField(field as HTMLInputElement, options, false));  // リアルタイムではグローバルエラーを表示しない
    field.addEventListener('blur', () => validateField(field as HTMLInputElement, options, false));   // フォーカスアウト時もグローバルエラーを表示しない
  });

  // Webflow統合時の特別な設定
  if (options.enableWebflow) {
    form.setAttribute('novalidate', 'true');
    // 初期状態ではエラーメッセージを非表示
    form.querySelectorAll('[data-validation="error"]').forEach(error => {
      (error as HTMLElement).style.display = 'none';
    });
  }

  // フォーム送信時の処理
  form.addEventListener('submit', async (e) => {
    if (options.enableWebflow) {
      // Webflow統合モードでのバリデーション
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
      // カスタム送信がない場合は、Webflowのデフォルト送信を許可
      return;
    }

    // 通常モードでの送信処理
    e.preventDefault();
    const isValid = validateForm(form, options);

    if (!isValid) {
      // エラー時の処理：最初のエラーフィールドまでスクロール
      const firstErrorField = form.querySelector('input:invalid, textarea:invalid, select:invalid') as HTMLElement;
      if (firstErrorField) {
        smoothScroll(firstErrorField, options.scrollOptions);
      }
      return;
    }

    // カスタム送信処理の実行
    const formData = new FormData(form);
    try {
      if ('onSubmit' in options) {
        await (options as { onSubmit: (data: FormData) => Promise<void> }).onSubmit(formData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });

  // ステップフォームを常に初期化
  return initializeStepForm(form, options);

  // フォーム操作用のメソッドを返却
  return {
    validateForm: () => validateForm(form, options),
    validateField: (field: HTMLInputElement) => validateField(field, options)
  };
}

// 名前付きエクスポートのみを使用
export { FormousInit as Formous };

// グローバル変数として公開
if (typeof window !== 'undefined') {
  window.Formous = FormousInit;
}
