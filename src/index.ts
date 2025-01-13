import { validateField, validateForm, addCustomValidationRules } from './validation';
import { initializeStepForm } from './step';
import { FormousOptions } from './types';

// Formous関数 - フォームバリデーションとステップ管理の初期化
export function Formous(options: FormousOptions) {
  const { formSelector, customRules, enableWebflow, enableConfirmationPage } = options; // オプションを分解
  const form = document.querySelector(formSelector) as HTMLFormElement; // フォームをセレクタで取得

  if (!form) {
    // 指定されたセレクタに一致するフォームが見つからない場合、エラーをスロー
    throw new Error(`Form with selector "${formSelector}" not found.`);
  }

  // カスタムルールを登録
  if (customRules) {
    addCustomValidationRules(customRules); // ユーザー定義のバリデーションルールをグローバルに登録
  }

  // バリデーションを初期化する関数
  const initializeValidation = () => {
    const fields = form.querySelectorAll('input, textarea, select'); // 全ての入力フィールドを取得
    fields.forEach((field) => {
      field.addEventListener('input', () => validateField(field as HTMLInputElement, options));
      field.addEventListener('blur', () => validateField(field as HTMLInputElement, options));
    });

    form.addEventListener('submit', (event) => {
      if (!validateForm(form, options)) {
        event.preventDefault(); // 無効な場合送信を中止
        alert('Please fix the errors before submitting.');
      }
    });
  };


  // Webflowのバリデーションを制御する関数
  const initializeWebflowValidation = () => {
    if (!enableWebflow) return; // Webflowバリデーションが無効の場合は終了

    // Webflow独自のスクリプトを無効化
    form.setAttribute('novalidate', 'true');

    // Webflowのsubmitイベントを制御
    form.addEventListener('submit', (event) => {
      const isValid = validateForm(form, options); // バリデーションを実行
      if (!isValid) {
        console.log('バリデーション失敗: フォーム送信を中止');
        event.preventDefault(); // バリデーションエラーがある場合、送信を中止
        event.stopPropagation(); // イベントの伝播を停止
      } else {
        console.log('バリデーション成功: Webflow送信を許可');
      }
    });

    // リアルタイムバリデーションを設定
    const fields = form.querySelectorAll('input, textarea, select'); // フォーム内の全てのフィールドを取得
    fields.forEach((field) => {
      // 入力時や変更時にバリデーションを実行
      field.addEventListener('input', () => validateField(field as HTMLInputElement, options));
      field.addEventListener('change', () => validateField(field as HTMLInputElement, options));
    });
  };

  // バリデーションの初期化
  initializeValidation();

  // ステップフォームの初期化に確認ページのオプションを渡す
  const stepForm = initializeStepForm(form, enableConfirmationPage, options);


  // Webflowバリデーションの初期化
  initializeWebflowValidation();

  // 必要であれば公開メソッドを返す
  return {
    refreshValidation: initializeValidation, // バリデーションを再初期化するメソッド
    ...stepForm, // ステップ管理のメソッド
  };
}

// グローバルスコープにFormousを登録（必要に応じて削除可能）
(window as any).Formous = Formous;
