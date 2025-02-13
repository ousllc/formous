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

## オプション設定

Formousは以下のオプションで初期化できます：

```javascript
Formous({
    // フォームのセレクター（必須）
    formSelector: '#my-form',
    
    // バリデーションメッセージのカスタマイズ
    validationMessages: {
        required: '必須項目です',
        email: 'メールアドレスの形式が正しくありません',
        minlength: (field) => `${field.getAttribute('minlength')}文字以上で入力してください`,
        maxlength: (field) => `${field.getAttribute('maxlength')}文字以下で入力してください`,
        min: (field) => `${field.getAttribute('min')}以上の値を入力してください`,
        max: (field) => `${field.getAttribute('max')}以下の値を入力してください`,
        password: 'パスワードの要件を満たしていません'
    },
    
    // パスワードの要件をカスタマイズ
    validationPatterns: {
        password: {
            minLength: 4,
            maxLength: 20,
            requireUppercase: true,
            requireNumber: true,
            requireSymbol: false
        }
    },
    
    // カスタムバリデーションルールの追加
    customRules: {
        postalCode: {
            validate: (value) => /^\d{3}-?\d{4}$/.test(value),
            message: () => '正しい郵便番号の形式で入力してください'
        }
    },
    
    // スクロール設定
    scrollOptions: {
        offset: 50,
        behavior: 'smooth',
        duration: '0.5s'
    },
    
    // ステップフォームの設定
    stepOptions: {
        progressFillSelector: '#progress-fill',  // プログレスバーの要素
        indicatorSelector: '.step-indicator',    // ステップインジケーターの要素
        progressSelector: '#step-progress',      // プログレス要素
        stepActiveClass: 'active',              // アクティブなステップのクラス
        indicatorActiveClass: 'active',         // アクティブなインジケーターのクラス
        useDisplayNone: false                   // display: noneを使用するか
    },
    
    // 確認ページ機能
    confirmationOptions: {
        delimiter: '/'  // 複数選択項目の区切り文字（デフォルト: '、'）
    },
    
    // Webflow統合
    enableWebflow: true,
    webflowOptions: {
        preventSubmit: true,
        customSubmit: (form) => {
            console.log('Custom submit:', form);
        }
    },
    
    // カスタム送信処理
    onSubmit: async (formData: FormData) => {
        const response = await fetch('/api/submit', {
            method: 'POST',
            body: formData
        });
    }
});
```

各オプションは必要に応じて設定可能です。設定しない場合はデフォルト値が使用されます。

### カスタム送信処理（onSubmit）

フォームの送信処理をカスタマイズできます。`onSubmit`オプションを使用することで、独自の送信ロジックを実装できます。

#### FormDataの活用例

```javascript
onSubmit: async (formData: FormData) => {
    // FormDataの中身を確認
    for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
    }

    // JSONに変換する場合
    const data = Object.fromEntries(formData.entries());
    
    // APIに送信
    const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}
```

#### 注意事項
- `onSubmit`は必ず`async`関数として定義してください
- 送信処理中のエラーは自動的にキャッチされます
- 送信に失敗した場合は、コンソールにエラーが出力されます

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
