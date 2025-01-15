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

## インストール

### CDNを使用する場合

```html
<!-- 最新版を使用 -->
<script src="https://cdn.jsdelivr.net/gh/ousllc/formous@latest/dist/formous.min.js"></script>

<!-- または、特定のバージョンを指定 -->
<script src="https://cdn.jsdelivr.net/gh/ousllc/formous@v0.1.0-beta.7/dist/formous.min.js"></script>
```

> 本番環境では、安定性を確保するために特定のバージョンを指定することをお勧めします。

### npmを使用する場合

```bash
npm install formous

# または、特定のバージョンを指定
npm install formous@v0.1.0-beta.6
```

## 基本的な使い方

### CDNを使用する場合

```html
<script src="https://cdn.jsdelivr.net/gh/ousllc/formous@latest/dist/formous.min.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', () => {
    Formous({
      formSelector: '#my-form',
      validationMessages: {
        required: '必須項目です',
        email: 'メールアドレスの形式が正しくありません'
      }
    });
  });
</script>
```

### モジュールとして使用する場合

```javascript
import { Formous } from 'formous';

Formous({
  formSelector: '#my-form',
  validationMessages: {
    required: '必須項目です',
    email: 'メールアドレスの形式が正しくありません'
  }
});
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

## オプション設定

Formousは以下のオプションで初期化できます：

```javascript
Formous({
    // フォームのセレクター（必須）
    formSelector: '#my-form',
    
    // バリデーションメッセージのカスタマイズ
    validationMessages: {
        required: '必須項目です',  // 必須項目のエラー
        email: 'メールアドレスの形式が正しくありません',  // メール形式のエラー
        minlength: (field) => `${field.getAttribute('minlength')}文字以上で入力してください`,  // 最小文字数
        maxlength: (field) => `${field.getAttribute('maxlength')}文字以下で入力してください`,  // 最大文字数
        min: (field) => `${field.getAttribute('min')}以上の値を入力してください`,  // 最小値
        max: (field) => `${field.getAttribute('max')}以下の値を入力してください`,  // 最大値
        password: 'パスワードの要件を満たしていません'  // パスワードのエラー
    },
    
    // パスワードの要件をカスタマイズ
    validationPatterns: {
        password: {
            minLength: 4,           // 最小文字数（デフォルト: 8）
            maxLength: 20,          // 最大文字数（デフォルト: 100）
            requireUppercase: true, // 大文字必須（デフォルト: true）
            requireNumber: true,    // 数字必須（デフォルト: true）
            requireSymbol: false    // 記号必須（デフォルト: true）
        }
    },
    
    // カスタムバリデーションルールの追加
    customRules: {
        postalCode: {
            validate: (value) => /^\d{3}-?\d{4}$/.test(value),  // 郵便番号の形式をチェック
            message: () => '正しい郵便番号の形式で入力してください'
        }
    },
    
    // スクロール設定
    scrollOptions: {
        offset: 50,            // スクロール時の上部マージン（px）
        behavior: 'smooth',    // スクロール動作（'auto'または'smooth'）
        duration: '0.5s'       // アニメーション時間
    },
    
    // 確認ページ機能
    enableConfirmationPage: true,  // 確認ページを有効化
    confirmationOptions: {
        delimiter: '/'  // 複数選択項目の区切り文字（デフォルト: '、'）
    },
    
    // Webflow統合
    enableWebflow: true,  // Webflow機能を有効化
    webflowOptions: {
        preventSubmit: true,  // デフォルトのsubmit処理を防ぐ
        customSubmit: (form) => {
            // カスタムのsubmit処理
            console.log('Custom submit:', form);
        }
    }
});
```

各オプションは必要に応じて設定可能です。設定しない場合はデフォルト値が使用されます。

## バリデーション機能

### エラーメッセージの表示ルール

エラーメッセージは以下の優先順位で表示されます：

1. `data-error-fixed`属性がある場合
   - HTML内のメッセージを固定表示
   - メッセージが空の場合は空のまま表示
2. オプションで設定されたメッセージ
3. HTML内にテキストが存在する場合
4. デフォルトのバリデーションメッセージ

### エラー要素の指定方法

1. 特定のバリデーションタイプに対応するエラー
   ```html
   <div data-validation="error" data-validation-type="required">必須項目です</div>
   <div data-validation="error" data-validation-type="minLength">2文字以上で入力してください</div>
   ```

2. 単一のエラー要素（最初のエラーを表示）
   ```html
   <div data-validation="error">必須項目です</div>
   ```

### 表示制御

- `data-validation-type`指定時：対応するエラーの有無で表示/非表示
- type指定なし：いずれかのエラーがある場合に表示
- すべてのエラーが解消された場合：非表示

```html
<form id="myForm" novalidate>



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
