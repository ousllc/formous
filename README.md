# Formous

Formousは、フォームの実装を簡単にするTypeScriptライブラリです。
バリデーション、スムーズスクロール、マルチステップフォーム、確認ページなど、
高度なフォーム機能を簡単に実装できます。
また、Webflowと連携して、WebflowのフォームをFormousでバリデーションすることも可能です。


## 特徴

- 📝 シンプルなフォームから複雑なマルチステップフォームまで対応
- ✨ HTML標準のバリデーション属性をサポート（required, minlength, maxlength など）
- 🎨 カスタマイズ可能なバリデーションルールとエラーメッセージ
- 🔄 確認ページ機能とプログレスバー
- 🌐 Webflow統合オプション
- 🚀 スムーズスクロール機能搭載
- 🔍 エラー時の自動スクロール
- 💫 TypeScript完全対応

## 目次
1. インストールと基本設定
2. HTML構造とデータ属性
3. バリデーションルール
4. エラーメッセージのカスタマイズ
5. 高度な機能
   - ステップフォーム
   - スクロールオプション
   - カスタムバリデーション
6. 設定オプション一覧
   - 基本設定
   - スクロール設定
   - ステップフォーム設定
   - 確認画面設定

## 使い方

### CDNでの利用
```html
<!-- 推奨: 特定のバージョンを指定 -->
<script src="https://cdn.jsdelivr.net/gh/ousllc/formous@v0.2.7/dist/formous.min.js"></script>
<!-- または最新版を使用 -->
<script src="https://cdn.jsdelivr.net/gh/ousllc/formous@latest/dist/formous.min.js"></script>
<script>
  Formous({
    formSelector: '#myForm'
  });
</script>
```

### npmでのインストール（オプション）
```bash
npm install @ousllc/formous
```

```typescript
import { Formous } from '@ousllc/formous';

Formous({
  formSelector: '#myForm'
});
```

## HTML構造とデータ属性

### 基本構造

#### シンプルな入力フィールド
```html
<form id="myForm" novalidate>
  <div>
    <input data-validation="required email" />
    <div data-validation="error"></div>
  </div>
</form>
```

#### より複雑な構造
```html
<form id="myForm" novalidate>
  <!-- フォームセクション -->
  <div class="form-section">
    <h4>基本情報</h4>

    <!-- 名前（複数のバリデーション） -->
    <div>
      <label for="name">名前:</label>
      <input type="text" id="name" name="name" 
        minlength="2" maxlength="30" required />
      <!-- 複数のエラーメッセージ -->
      <div data-validation="error" data-validation-type="required">
        名前は必須項目です
      </div>
      <div data-validation="error" data-validation-type="minlength">
        2文字以上で入力してください
      </div>
    </div>

    <!-- メール（エラー位置の指定） -->
    <div data-error="target">
      <label for="email">メールアドレス:</label>
      <input type="email" id="email" name="email" required />
      <!-- エラーメッセージは親要素の後に表示 -->
    </div>
    <div data-validation="error">メールアドレスを入力してください</div>
  </div>

  <!-- チェックボックスグループ -->
  <div class="form-section">
    <fieldset data-validation="checkbox-group" 
      data-group-min="1" data-group-max="3">
      <legend>興味のある分野（1つ以上3つまで）:</legend>
      <div>
        <input type="checkbox" id="interest-web" name="interests" value="web">
        <label for="interest-web">Web開発</label>
      </div>
      <div>
        <input type="checkbox" id="interest-mobile" name="interests" value="mobile">
        <label for="interest-mobile">モバイルアプリ</label>
      </div>
    </fieldset>
    <div data-validation="error">1つ以上3つまでの項目を選択してください</div>
  </div>

  <!-- グローバルエラーメッセージ -->
  <div class="global-errors" data-validation-error-global>
    <div data-validation="error" data-validation-type="required" 
      data-validation-for="name">
      名前は必須項目です
    </div>
    <div data-validation="error" data-validation-type="email" 
      data-validation-for="email">
      正しいメールアドレスの形式で入力してください
    </div>
  </div>
</form>
```

### エラー表示の制御

#### エラーメッセージの表示位置
- `data-validation="error"`: エラーメッセージ表示要素
- `data-error="target"`: エラーメッセージの表示位置指定
```html
<!-- 通常のエラー表示（直後） -->
<div>
  <input type="text" required />
  <div data-validation="error"></div>
</div>

<!-- エラー表示位置の指定 -->
<div data-error="target">
  <input type="text" required />
</div>
<div data-validation="error"></div>
```

#### 特定のバリデーションタイプに対するエラー
- `data-validation-type="required"`: 特定のバリデーションタイプに対するエラー
```html
<div>
  <input type="text" minlength="3" maxlength="10" required />
  <!-- 必須エラー -->
  <div data-validation="error" data-validation-type="required">
    必須項目です
  </div>
  <!-- 最小文字数エラー -->
  <div data-validation="error" data-validation-type="minlength">
    3文字以上で入力してください
  </div>
</div>
```

#### グローバルエラー表示
- `data-validation-error-global`: グローバルエラー表示領域
```html
<!-- フォーム下部にまとめて表示 -->
<div class="global-errors" data-validation-error-global>
  <div data-validation="error" data-validation-type="required" 
    data-validation-for="name">
    名前は必須項目です
  </div>
  <div data-validation="error" data-validation-type="email" 
    data-validation-for="email">
    正しいメールアドレスの形式で入力してください
  </div>
</div>
```

## バリデーションルール

### 基本ルール

以下のバリデーションルールは、`data-validation`属性に指定して使用できます：

- `required`: 必須入力
- `email`: メールアドレス形式
- `numeric`: 数値のみ
- `alphanumeric`: 英数字のみ
- `minLength`: 最小文字数（`minlength`属性と併用）
- `maxLength`: 最大文字数（`maxlength`属性と併用）
- `min`: 数値の最小値（`min`属性と併用）
- `max`: 数値の最大値（`max`属性と併用）
- `pattern`: カスタム正規表現（`pattern`属性と併用）
- `url`: URL形式
- `date`: 日付形式
- `time`: 時刻形式
- `phone`: 電話番号形式
- `postalCode`: 郵便番号形式
- `equals`: 他フィールドとの値一致
- `halfwidthKatakana`: 半角カタカナ
- `zenkaku`: 全角文字

#### パスワードバリデーション設定
パスワードルールは、オプションで詳細な要件を設定できます：

```typescript
Formous({
  validationPatterns: {
    password: {
      minLength: 8,            // 最小文字数
      requireUppercase: true,  // 大文字を含む
      requireNumber: true,     // 数字を含む
      requireSymbol: true      // 記号を含む
    }
  }
});
```

各ルールのエラーメッセージは`validationMessages`オプションでカスタマイズ可能です：

```typescript
Formous({
  validationMessages: {
    required: '必須項目です',
    email: 'メールアドレスの形式が正しくありません',
    // ... 他のメッセージ
  }
});
```

### グループバリデーション
- `checkbox-group`: チェックボックスグループ
  - `data-group-min`: 最小選択数
  - `data-group-max`: 最大選択数

## エラーメッセージのカスタマイズ

### 優先順位
1. `data-error-fixed`属性による固定メッセージ
2. `validationMessages`オプションによるカスタマイズ
3. デフォルトメッセージ

#### 固定メッセージ（data-error-fixed）
```html
<!-- このメッセージは常に表示され、validationMessagesでも上書きされません -->
<div data-validation="error" data-validation-type="required" data-error-fixed>
  この項目は必ず入力してください
</div>
```

### カスタマイズ例

#### validationMessagesによるカスタマイズ
```typescript
Formous({
  validationMessages: {
    required: '必須項目です',
    'checkbox-group': (field) => {
      const min = field.closest('[data-validation="checkbox-group"]')
        ?.getAttribute('data-group-min');
      return `${min}個以上選択してください`;
    }
  }
});
```

#### 優先順位の例
```html
<div>
  <input type="text" required />
  <!-- 1. 固定メッセージ（最優先） -->
  <div data-validation="error" data-error-fixed>
    この項目は必須です
  </div>
  <!-- 2. validationMessagesで上書き可能 -->
  <div data-validation="error">
    必須項目です
  </div>
  <!-- 3. デフォルトメッセージ（最後） -->
  <div data-validation="error">
    This field is required
  </div>
</div>
```

## 高度な機能

### ステップフォーム

#### 基本構造
```html
<form id="step-form">
  <!-- プログレスバー（任意） -->
  <div id="progress-container">
    <div id="progress-bar">
      <div id="progress-fill"></div>
    </div>
    <div id="step-indicators">
      <span class="step-indicator-item">1</span>
      <span class="step-indicator-item">2</span>
    </div>
  </div>

  <!-- ステップコンテンツ -->
  <div class="step">Step 1</div>
  <div class="step">Step 2</div>
  <div class="step" data-confirmation="true">確認</div>
</form>
```

#### 必須オプション設定
```typescript
Formous({
  formSelector: '#step-form',
  stepOptions: {
    // プログレスバー関連（追加した場合は必須）
    progressFillSelector: '#progress-fill',    // プログレスバーの塗りつぶし要素
    progressSelector: '#progress-bar',         // プログレスバーのコンテナ
    indicatorSelector: '.step-indicator-item', // ステップインジケーター

    // クラス名設定
    stepActiveClass: 'active',          // アクティブなステップのクラス
    indicatorActiveClass: 'active',     // アクティブなインジケーターのクラス

    // 表示制御
    useDisplayNone: true                // display: noneで非表示にする
  }
});
```

#### ナビゲーション
- `data-action="next"`: 次へボタン
- `data-action="previous"`: 戻るボタン
- `data-action="edit"`: 編集ボタン

### スクロールオプション
```typescript
scrollOptions: {
  offset: 50,      // スクロール位置のオフセット
  behavior: 'smooth', // スクロールの動作
  duration: '0.5s'   // アニメーション時間
}
```

### カスタムバリデーションルール

#### 基本的な使い方
```typescript
customRules: {
  myRule: {
    validate: (value) => boolean,
    message: () => string
  }
}
```

#### 実装例
```typescript
Formous({
  formSelector: '#myForm',
  customRules: {
    // 郵便番号（例: 123-4567）
    postalCode: {
      validate: (value) => /^\d{3}-\d{4}$/.test(value),
      message: () => '郵便番号の形式が正しくありません（例: 123-4567）'
    },

    // パスワード強度
    strongPassword: {
      validate: (value) => {
        const hasUpperCase = /[A-Z]/.test(value);
        const hasLowerCase = /[a-z]/.test(value);
        const hasNumbers = /\d/.test(value);
        const hasSpecial = /[!@#$%^&*]/.test(value);
        return value.length >= 8 && 
          hasUpperCase && hasLowerCase && 
          hasNumbers && hasSpecial;
      },
      message: () => 'パスワードは8文字以上で、大文字・小文字・数字・記号を含める必要があります'
    },

    // 年齢制限（18歳以上）
    adultAge: {
      validate: (value) => {
        const birthDate = new Date(value);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        return age >= 18;
      },
      message: () => '18歳以上である必要があります'
    }
  }
});
```

#### HTML での使用例
```html
<div>
  <label>郵便番号:</label>
  <input type="text" data-validation="postalCode" />
  <div data-validation="error"></div>
</div>

<div>
  <label>パスワード:</label>
  <input type="password" data-validation="strongPassword" />
  <div data-validation="error"></div>
</div>

<div>
  <label>生年月日:</label>
  <input type="date" data-validation="adultAge" />
  <div data-validation="error"></div>
</div>
```

## 設定オプション一覧

### 基本設定
```typescript
{
  // フォーム要素のセレクタ（必須）
  formSelector: string;

  // フォーム送信時の処理
  onSubmit?: (data: FormData) => Promise<void>;

  // Webflow連携オプション
  enableWebflow?: boolean;
  webflowOptions?: {
    customSubmit?: (form: HTMLFormElement) => void;
  };
}
```

### バリデーション設定
```typescript
{
  // バリデーションメッセージのカスタマイズ
  validationMessages?: {
    required?: string | ((field: HTMLInputElement) => string);
    email?: string | ((field: HTMLInputElement) => string);
    minlength?: string | ((field: HTMLInputElement) => string);
    maxlength?: string | ((field: HTMLInputElement) => string);
    min?: string | ((field: HTMLInputElement) => string);
    max?: string | ((field: HTMLInputElement) => string);
    password?: string | ((field: HTMLInputElement, options?: FormousOptions) => string);
    [key: string]: string | ((field: HTMLInputElement) => string) | undefined;
  };

  // パスワードバリデーションパターン
  validationPatterns?: {
    password?: {
      minLength?: number;
      maxLength?: number;
      requireUppercase?: boolean;
      requireNumber?: boolean;
      requireSymbol?: boolean;
    };
    [key: string]: any;
  };

  // カスタムバリデーションルール
  customRules?: {
    [key: string]: {
      validate: (value: string, field: HTMLInputElement) => boolean;
      message: (field: HTMLInputElement) => string;
    };
  };
}
```

### スクロール設定
```typescript
{
  scrollOptions?: {
    offset?: number;           // スクロール位置のオフセット
    behavior?: 'auto' | 'smooth';  // スクロール動作
    duration?: string;         // アニメーション時間
  };
}
```

### ステップフォーム設定
```typescript
{
  stepOptions?: {
    // セレクター設定
    progressFillSelector?: string;   // プログレスバーの塗り部分
    indicatorSelector?: string;      // ステップインジケーター
    progressSelector?: string;       // プログレスバー
    progressParent?: string;         // プログレスバーの親要素
    indicatorParent?: string;        // インジケーターの親要素
    stepParent?: string;            // ステップの親要素

    // クラス名設定
    stepActiveClass?: string;        // アクティブなステップのクラス
    indicatorActiveClass?: string;   // アクティブなインジケーターのクラス

    // 動作設定
    useDisplayNone?: boolean;        // display: noneによる表示制御
  };

  // レガシーサポート用（非推奨）
  progressFillSelector?: string;
  indicatorSelector?: string;
  progressSelector?: string;
}
```

### 確認画面設定
```typescript
{
  confirmationOptions?: {
    delimiter?: string;         // 複数選択値の区切り文字
  };
}
```

### Webflow連携設定

Webflowで作成したフォームとFormousを連携させるための設定です。

#### 基本設定
```typescript
Formous({
  formSelector: '#myForm',
  enableWebflow: true  // Webflow連携を有効化
});
```

この設定だけで、WebflowのデフォルトのフォームSubmit処理とFormousのバリデーションが連携します。

#### カスタム送信処理
より高度な制御が必要な場合（例：独自のエンドポイントへの送信、追加データの付与など）は、`webflowOptions`の`customSubmit`を使用できます：

```typescript
Formous({
  formSelector: '#myForm',
  enableWebflow: true,
  webflowOptions: {
    // フォーム送信をカスタマイズ
    customSubmit: async (form) => {
      // 例：独自のエンドポイントに送信
      const formData = new FormData(form);
      try {
        const response = await fetch('/api/custom-endpoint', {
          method: 'POST',
          body: formData
        });
        if (!response.ok) throw new Error('送信エラー');
        // 成功時の処理
      } catch (error) {
        // エラー時の処理
      }
    }
  }
});
```

`customSubmit`を使用する主な理由：
- Webflowのデフォルトの送信先以外にデータを送信したい場合
- 送信前にデータを加工したい場合
- 送信後の処理をカスタマイズしたい場合
- エラーハンドリングを詳細に制御したい場合

**注意**: `customSubmit`を使用する場合、WebflowのデフォルトのSubmit処理は実行されません。必要に応じて`customSubmit`内で明示的に呼び出す必要があります。

## 最新バージョン
現在の最新バージョンは v0.2.7 です。

## ライセンス
MIT

## 作者
オース　Daishi Arakawa (@ousllc)
