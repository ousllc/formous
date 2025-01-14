# Formous

Formousは、フォームの実装を簡単にするTypeScriptライブラリです。
バリデーション、スムーズスクロール、マルチステップフォーム、確認ページなど、
高度なフォーム機能を簡単に実装できます。

## 特徴

- 📝 シンプルなフォームから複雑なマルチステップフォームまで対応
- ✨ HTML標準のバリデーション属性をサポート（required, minlength, maxlength など）
- 🎨 カスタマイズ可能なバリデーションルールとエラーメッセージ
- 🔄 確認ページ機能とプログレスバー
- 🌐 Webflow統合オプション

## クイックスタート

### CDNでの利用

```html
<!-- headタグ内に追加 -->
<script src="https://cdn.jsdelivr.net/npm/formous@latest/dist/formous.min.js"></script>
```

または

```html
<!-- モジュールとして利用 -->
<script type="module">
  import { Formous } from 'https://cdn.jsdelivr.net/npm/formous@latest/dist/formous.esm.js';
  // Formousの初期化
</script>
```

### 開発者向けインストール

```bash
# npmを使用
npm install formous

# または、yarnを使用
yarn add formous

# または、pnpmを使用
pnpm add formous
```

## 基本的な使い方

### 1. HTMLの準備

まず、必要なマークアップを準備します。Formousは`data-validation`属性を使用してバリデーションとエラーメッセージを制御します。

#### エラーメッセージの表示方法

エラーメッセージは`data-validation="error"`属性を持つ要素で定義します。
`data-validation-type`属性でエラーの種類を指定します。

```html
<form id="my-form">
  <div>
    <label for="name">名前:</label>
    <input type="text" id="name" name="name" required minlength="2">
    <div data-validation="error" data-validation-type="required">
      必須項目です
    </div>
    <div data-validation="error" data-validation-type="minlength">
      2文字以上で入力してください
    </div>
  </div>
  
  <div>
    <label for="email">メールアドレス:</label>
    <input type="email" id="email" name="email" required>
    <div data-validation="error" data-validation-type="email" data-error-fixed>
      正しいメールアドレスを入力してください
    </div>
  </div>
  
  <button type="submit">送信</button>
</form>
```

#### エラー表示の種類

1. **フィールド直下のエラー**
```html
<div>
  <input type="text" name="username" required>
  <div data-validation="error" data-validation-type="required">
    必須項目です
  </div>
</div>
```

2. **グローバルエラー**（フォーム内の任意の場所）
```html
<div data-validation-error="username">
  <!-- usernameフィールドのエラーがここに表示 -->
</div>
```

3. **グループエラー**（チェックボックスやラジオボタン）
```html
<fieldset>
  <!-- チェックボックスグループ -->
  <div data-validation="error" data-validation-type="checkbox-group">
    <!-- グループ全体のエラー -->
  </div>
</fieldset>
```

4. **カスタム位置のエラー**
```html
<!-- data-validation-for属性で対象フィールドを指定 -->
<div data-validation="error" data-validation-type="required" data-validation-for="username">
  ユーザー名は必須です
</div>
```

#### エラーメッセージの優先順位

1. `data-error-fixed`属性を持つメッセージ（常に固定）
2. `validationMessages`オプションで設定したメッセージ
3. デフォルトのバリデーションメッセージ

#### エラー表示の詳細仕様

1. **表示タイミング**
   - フォーム送信時
   - フィールドからフォーカスが外れたとき（blur）
   - 入力中（input）のリアルタイムバリデーション

2. **エラーの優先度**
   - required（必須）
   - format（email, tel等の形式）
   - length（minlength, maxlength）
   - range（min, max）
   - pattern（正規表現）
   - custom（カスタムバリデーション）

3. **エラーメッセージの表示制御**
```javascript
Formous({
  formSelector: '#my-form',
  validationMessages: {
    // 静的メッセージ
    required: '必須項目です',

    // 動的メッセージ（フィールドの属性を参照可能）
    minlength: (field) => {
      const min = field.getAttribute('minlength');
      return `${min}文字以上で入力してください`;
    },

    // フィールド固有のメッセージ
    'username:required': 'ユーザー名は必須です',
    'email:format': 'メールアドレスの形式が正しくありません'
  }
});
```

4. **エラー表示のカスタマイズ**
```html
<!-- エラーメッセージのスタイル固定 -->
<div data-validation="error" data-validation-type="required" data-error-fixed>
  このメッセージは上書きされません
</div>

<!-- エラーメッセージの表示位置指定 -->
<div data-validation="error" data-validation-type="required" data-error-position="after">
  フィールドの後ろに表示
</div>

<!-- 複数のバリデーションタイプに対応 -->
<div data-validation="error" data-validation-type="required|email">
  必須項目です / メールアドレスの形式が正しくありません
</div>
```

5. **エラーのクリア**
   - 正しい入力がされたとき自動的にクリア
   - フォームリセット時にクリア
   - 手動でクリアも可能：
```javascript
const form = document.querySelector('#my-form');
Formous.clearErrors(form);  // フォーム全体のエラーをクリア
Formous.clearFieldError(form.querySelector('[name="email"]'));  // 特定フィールドのエラーをクリア
```

### 2. Formousの初期化

HTMLの準備ができたら、Formousを初期化します。初期化は非常にシンプルで、
最小限の設定から始めることができます。

```javascript
// 最小限の設定
Formous({
  formSelector: '#my-form'
});

// または、詳細な設定
Formous({
  formSelector: '#my-form',
  // バリデーションメッセージのカスタマイズ
  validationMessages: {
    required: '必須項目です',
    email: 'メールアドレスの形式が正しくありません',
    minlength: (field) => `${field.getAttribute('minlength')}文字以上で入力してください`
  },
  // スクロールオプション
  scrollOptions: {
    offset: 50,        // スクロール位置の上部からのオフセット
    duration: '0.5s',  // スクロールアニメーションの時間
    behavior: 'smooth' // スクロールの動作
  }
});
```

### 4. グローバルエラーメッセージ

フォーム全体でエラーメッセージを表示する場合は、`data-validation-error`属性を使用します：

```html
<form id="my-form">
  <!-- フォームフィールド -->

  <!-- グローバルエラーメッセージ -->
  <div data-validation-error="email">
    メールアドレスが正しくありません
  </div>
</form>
```

### 5. チェックボックスグループのバリデーション

複数選択の最小数/最大数を制御できます：

```html
<fieldset data-validation="checkbox-group" data-group-min="1" data-group-max="3">
  <legend>興味のある分野（1つ以上3つまで）:</legend>
  <div>
    <input type="checkbox" name="interests" value="web">
    <label>Web開発</label>
  </div>
  <!-- その他のチェックボックス -->
  <div data-validation="error" data-validation-type="checkbox-group">
    1つ以上3つまでの項目を選択してください
  </div>
</fieldset>
```

## 高度な機能

### マルチステップフォーム

マルチステップフォームを使用すると、長いフォームを複数のステップに分割して
ユーザーの入力負担を軽減できます。

#### ステップフォームの機能

- 進捗バーによる進行状況の表示
- ステップ間の移動（次へ/戻る）
- 各ステップでのバリデーション
- 確認ページの自動生成

```html
<form id="step-form">
  <!-- プログレスバー（オプション） -->
  <div id="progress-container">
    <div id="progress-bar">
      <div id="progress-fill"></div>
    </div>
    <div id="step-indicators">
      <span class="step-indicator">1</span>
      <span class="step-indicator">2</span>
    </div>
  </div>

  <!-- ステップ1 -->
  <div class="step active">
    <h3>基本情報</h3>
    <!-- フォームフィールド -->
    <button type="button" data-action="next">次へ</button>
  </div>

  <!-- ステップ2 -->
  <div class="step">
    <h3>詳細情報</h3>
    <!-- フォームフィールド -->
    <button type="button" data-action="previous">戻る</button>
    <button type="submit">送信</button>
  </div>
</form>
```

#### 確認ページの設定

```html
<!-- 確認ページ用の要素 -->
<div class="step" data-confirmation="true">
  <h3>入力内容の確認</h3>
  <dl>
    <dt>お名前:</dt>
    <dd data-confirm="name"></dd>
    <dt>メールアドレス:</dt>
    <dd data-confirm="email"></dd>
  </dl>
  <button type="button" data-action="previous">修正する</button>
  <button type="submit">送信する</button>
</div>
```

```javascript
Formous({
  formSelector: '#step-form',
  enableConfirmationPage: true,  // 確認ページを有効化
  confirmationOptions: {
    delimiter: '、'  // 複数選択項目の区切り文字
  }
});
```

### カスタムバリデーション

独自のバリデーションルールを追加することができます。
電話番号やパスワードの強度チェックなど、プロジェクト固有の要件に対応できます。

#### カスタムルールの例

```javascript
Formous({
  formSelector: '#my-form',
  customRules: {
    phone: {
      validate: (value) => /^[0-9-]{10,}$/.test(value),
      message: () => '有効な電話番号を入力してください'
    },
    password: {
      validate: (value) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value),
      message: () => 'パスワードは8文字以上で、英字と数字を含める必要があります'
    },
    equals: {
      validate: (value, field) => {
        const targetName = field.getAttribute('data-equals');
        const targetField = document.querySelector(`[name="${targetName}"]`);
        return targetField ? value === targetField.value : false;
      },
      message: () => '入力値が一致しません'
    }
  }
});
```

## オプション一覧

| オプション | 型 | 説明 |
|------------|-----|------|
| formSelector | string | フォーム要素のセレクタ |
| validationMessages | object | バリデーションメッセージの設定 |
| customRules | object | カスタムバリデーションルール |
| scrollOptions | object | スクロール動作の設定 |
| enableConfirmationPage | boolean | 確認ページの有効化 |
| enableWebflow | boolean | Webflow統合の有効化 |

### validationMessages

```typescript
{
  required?: string | ((field: HTMLInputElement) => string);
  email?: string | ((field: HTMLInputElement) => string);
  minlength?: string | ((field: HTMLInputElement) => string);
  maxlength?: string | ((field: HTMLInputElement) => string);
  min?: string | ((field: HTMLInputElement) => string);
  max?: string | ((field: HTMLInputElement) => string);
  [key: string]: string | ((field: HTMLInputElement) => string) | undefined;
}
```

### scrollOptions

```typescript
{
  offset?: number;      // スクロール位置の上部からのオフセット（デフォルト: 50px）
  duration?: string;    // スクロールアニメーションの時間（例: '0.5s'）
  behavior?: 'auto' | 'smooth';  // スクロールの動作
}
```

## ライセンス

MIT

## 貢献

Formousはオープンソースプロジェクトです。以下の方法で貢献できます：

1. バグの報告
2. 新機能の提案
3. ドキュメントの改善
4. プルリクエストの提出

バグ報告や機能要望は[Issues](https://github.com/yourusername/formous/issues)にお願いします。

プルリクエストも歓迎します。大きな変更を加える場合は、まずIssueを作成して変更内容を議論させてください。

## 作者

オース　Daishi Arakawa (@ousllc)
