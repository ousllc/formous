# Formous

Formousは、マルチステップフォームを簡単に実装できるTypeScriptライブラリです。バリデーション、確認ページ、カスタマイズ可能なエラーメッセージなどの機能を提供します。

## 特徴

- マルチステップフォーム
- HTML標準のバリデーション属性サポート
- カスタマイズ可能なバリデーションルール
- 確認ページ機能
- プログレスバー
- Webflow統合オプション

## インストール

```bash
npm install formous
```

## 使用方法

Formousは以下の形式で提供されています：

- **ES Modules** (`index.js`): モダンな開発環境向け
- **CommonJS** (`index.cjs`): Node.js環境向け
- **UMD** (`index.umd.cjs`): ブラウザで直接使用する場合向け

### ES Modules (推奨)

```javascript
import { Formous } from 'formous';

Formous({
  formSelector: '#my-form',
  // オプション
});
```

### CommonJS

```javascript
const { Formous } = require('formous');

Formous({
  formSelector: '#my-form',
  // オプション
});
```

### ブラウザで直接使用

```html
<!-- 最新版 -->
<script src="https://cdn.jsdelivr.net/gh/ousllc/formous@latest/dist/index.umd.cjs"></script>

<!-- 特定のバージョン -->
<script src="https://cdn.jsdelivr.net/gh/ousllc/formous@v0.1.0-beta.1/dist/index.umd.cjs"></script>
```

### 型定義

TypeScriptユーザー向けに型定義ファイル（`.d.ts`）も提供されています。
これらは自動的にインポートされ、IDEでの型チェックとコード補完が有効になります。

## 基本的な使用方法

```html
<form id="step-form">
  <!-- ステップ1 -->
  <div class="step active">
    <input type="text" name="firstName" required minlength="2">
    <div data-validation="error" data-validation-type="required">必須項目です</div>
    <button type="button" data-action="next">Next</button>
  </div>

  <!-- ステップ2 -->
  <div class="step">
    <!-- フォーム要素 -->
    <button type="button" data-action="previous">Previous</button>
    <button type="button" data-action="next">Next</button>
  </div>

  <!-- 確認ページ -->
  <div class="step" data-confirmation="true">
    <p>Name: <span data-confirm="firstName"></span></p>
    <button type="button" data-action="edit" data-target-step="1">編集</button>
  </div>
</form>

<script>
Formous({
  formSelector: '#step-form',
  enableConfirmationPage: true
});
</script>
```


## バリデーション

### HTML標準バリデーション属性
- required
- minlength
- maxlength
- min
- max
- pattern
- type="email"
- type="url"
- type="date"
- type="time"

### カスタムバリデーション
```javascript
Formous({
  customRules: {
    password: {
      validate: (value) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value),
      message: () => 'パスワードは8文字以上で、英字と数字を含める必要があります'
    }
  }
});
```


### エラーメッセージのカスタマイズ
```javascript
Formous({
  validationMessages: {
    required: '必須項目です',
    email: 'メールアドレスの形式が正しくありません',
    minLength: (field) => `${field.getAttribute('minlength')}文字以上で入力してください`
  }
});
```


### エラーメッセージの優先順位
1. `data-error-fixed`属性を持つメッセージ（最優先）
2. オプションで指定されたメッセージ
3. デフォルトメッセージ

## チェックボックスグループ

```html
<fieldset data-validation="checkbox-group" data-group-min="2" data-group-max="5">
  <legend>選択（2つ以上5つまで）：</legend>
  <input type="checkbox" name="options" value="1">
  <input type="checkbox" name="options" value="2">
  <div data-validation="error" data-validation-type="checkbox-group">
    2つ以上5つまでの項目を選択してください
  </div>
</fieldset>
```


## 確認ページ

### 基本設定
```javascript
Formous({
  enableConfirmationPage: true,
  confirmationOptions: {
    delimiter: '/' // チェックボックスグループの区切り文字
  }
});
```


### 確認ページの編集機能
```html
<div class="step" data-confirmation="true">
  <div class="confirmation-section" data-step="1">
    <button data-action="edit" data-target-step="1">編集</button>
  </div>
</div>
```


## Webflow統合

```javascript
Formous({
  enableWebflow: true,
  webflowOptions: {
    preventSubmit: true,
    customSubmit: (form) => {
      // カスタム送信処理
    }
  }
});
```


## オプション一覧

```typescript
type FormousOptions = {
    formSelector: string;
    enableWebflow?: boolean;
    webflowOptions?: {
        preventSubmit?: boolean;
        customSubmit?: (form: HTMLFormElement) => void;
    };
    enableConfirmationPage?: boolean;
    confirmationOptions?: {
        delimiter?: string;
    };
    validationMessages?: {
        [key: string]: string | ((field: HTMLInputElement) => string);
    };
    customRules?: {
        [key: string]: {
            validate: (value: string, field: HTMLInputElement) => boolean;
            message: (field: HTMLInputElement) => string;
        };
    };
};
```


## 実装例と詳細説明

### 基本的なステップフォーム

```html
<!-- 基本的な3ステップフォーム -->
<form id="basic-step-form">
  <!-- プログレスバー -->
  <div id="progress-container">
    <div id="progress-bar">
      <div id="progress-fill"></div>
    </div>
    <div id="step-indicators">
      <span class="step-indicator">1</span>
      <span class="step-indicator">2</span>
      <span class="step-indicator">3</span>
    </div>
  </div>

  <!-- Step 1: 基本情報 -->
  <div class="step active">
    <h4>基本情報</h4>
    <div>
      <label for="name">名前:</label>
      <input type="text" id="name" name="name" required minlength="2">
      <div data-validation="error" data-validation-type="required">必須項目です</div>
      <div data-validation="error" data-validation-type="minlength">2文字以上で入力してください</div>
    </div>
    <button type="button" data-action="next">Next</button>
  </div>

  <!-- Step 2: 詳細情報 -->
  <div class="step">
    <h4>詳細情報</h4>
    <button type="button" data-action="previous">Previous</button>
    <button type="button" data-action="next">Next</button>
  </div>

  <!-- Step 3: 確認 -->
  <div class="step" data-confirmation="true">
    <h4>確認</h4>
    <div class="confirmation-section" data-step="1">
      <p>名前: <span data-confirm="name"></span></p>
      <button type="button" data-action="edit" data-target-step="1">編集</button>
    </div>
    <button type="submit">Submit</button>
  </div>
</form>
```


### 高度なバリデーション例

```html
<!-- パスワードと確認用パスワード -->
<div>
  <label for="password">パスワード:</label>
  <input 
    type="password" 
    id="password" 
    name="password" 
    data-validation="password"
    required
  >
  <div data-validation="error" data-validation-type="password" data-error-fixed>
    8文字以上で、英字と数字を含める必要があります
  </div>
</div>

<div>
  <label for="confirmPassword">パスワード（確認）:</label>
  <input 
    type="password" 
    id="confirmPassword" 
    name="confirmPassword"
    data-validation="equals" 
    data-equals="password"
    required
  >
  <div data-validation="error" data-validation-type="equals">
    パスワードが一致しません
  </div>
</div>

<script>
Formous({
  formSelector: '#advanced-form',
  customRules: {
    password: {
      validate: (value) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value),
      message: () => 'パスワードは8文字以上で、英字と数字を含める必要があります'
    }
  }
});
</script>
```


### チェックボックスグループの詳細な実装

```html
<!-- 複数選択グループ -->
<fieldset data-validation="checkbox-group" data-group-min="2" data-group-max="5">
  <legend>興味のある分野（2つ以上5つまで）:</legend>
  
  <div class="checkbox-wrapper">
    <input type="checkbox" id="opt1" name="interests" value="frontend">
    <label for="opt1">フロントエンド開発</label>
  </div>
  
  <div class="checkbox-wrapper">
    <input type="checkbox" id="opt2" name="interests" value="backend">
    <label for="opt2">バックエンド開発</label>
  </div>
  
  <!-- エラーメッセージ -->
  <div data-validation="error" data-validation-type="checkbox-group">
    2つ以上5つまでの項目を選択してください
  </div>
</fieldset>
```


## エラーメッセージのカスタマイズ詳細

### 固定メッセージ
```html
<div data-validation="error" data-validation-type="required" data-error-fixed>
  この項目は必ず入力してください
</div>
```


### 動的メッセージ
```javascript
Formous({
  validationMessages: {
    required: '必須項目です',
    email: 'メールアドレスの形式が正しくありません',
    minlength: (field) => {
      const min = field.getAttribute('minlength');
      return `${min}文字以上で入力してください`;
    },
    maxlength: (field) => {
      const max = field.getAttribute('maxlength');
      return `${max}文字以下で入力してください`;
    }
  }
});
```


## Webflow統合の詳細

```javascript
Formous({
  enableWebflow: true,
  webflowOptions: {
    preventSubmit: true,
    customSubmit: async (form) => {
      try {
        const formData = new FormData(form);
        const response = await fetch('/api/submit', {
          method: 'POST',
          body: formData
        });
        
        if (response.ok) {
          window.location.href = '/thank-you';
        } else {
          alert('送信に失敗しました');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }
});
```


## スタイリングのヒント

```css
/* プログレスバー */
#progress-container {
  width: 100%;
  margin: 20px 0;
}

#progress-bar {
  height: 4px;
  background: #eee;
}

#progress-fill {
  height: 100%;
  background: #4CAF50;
  transition: width 0.3s ease;
}

/* ステップインジケーター */
.step-indicator {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #eee;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
}

.step-indicator.active {
  background: #4CAF50;
  color: white;
}

/* エラーメッセージ */
[data-validation="error"] {
  display: none;
  color: #f44336;
  font-size: 0.875rem;
  margin-top: 4px;
}
```


## イベントハンドリング

```javascript
const form = document.querySelector('#step-form');
const formous = Formous({
  formSelector: '#step-form',
  onStepChange: (currentStep, nextStep) => {
    console.log(`Moving from step ${currentStep} to ${nextStep}`);
  },
  onValidationError: (field, errorType) => {
    console.log(`Validation error: ${errorType} on field ${field.name}`);
  },
  onSubmit: async (formData) => {
    // カスタム送信処理
  }
});
```


## ライセンス

MIT

## 貢献

バグ報告や機能要望は[Issues](https://github.com/yourusername/formous/issues)にお願いします。

プルリクエストも歓迎します。大きな変更を加える場合は、まずIssueを作成して変更内容を議論させてください。

## 作者

オース　Daishi Arakawa (@ousllc)
