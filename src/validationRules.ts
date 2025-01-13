// バリデーションルールの型定義
export type ValidationRule = {
    validate: (value: string, field: HTMLInputElement) => boolean; // 検証関数
    message: (field: HTMLInputElement) => string; // エラーメッセージ生成関数
};

// デフォルトのバリデーションルールセット
export const defaultValidationRules: { [key: string]: ValidationRule } = {
    required: {
        // 入力が空でないか確認
        validate: (value, field) => {
            // data-validation="required" または required 属性があれば検証
            const isRequired = field.hasAttribute('required') || field.getAttribute('data-validation')?.includes('required');
            return !isRequired || value.trim().length > 0;
        },
        message: () => 'This field is required.',
    },
    email: {
        // メールアドレス形式か確認
        validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        message: () => 'Please enter a valid email address.',
    },
    numeric: {
        // 数字形式か確認
        validate: (value) => /^[0-9]+$/.test(value),
        message: () => 'Please enter a valid number.',
    },
    alphanumeric: {
        // 英数字形式か確認
        validate: (value) => /^[a-zA-Z0-9]+$/.test(value),
        message: () => 'Please enter only letters and numbers.',
    },
    minLength: {
        validate: (value, field) => {
            const minLength = field.getAttribute('minlength');
            return !minLength || value.length >= parseInt(minLength);
        },
        message: (field) => `Minimum length is ${field.getAttribute('minlength')}`,
    },
    maxLength: {
        validate: (value: string, field: HTMLInputElement) => {
            const maxLength = field.getAttribute('maxlength');
            if (!maxLength) return true;
            return value.length <= Number(maxLength);
        },
        message: (field: HTMLInputElement) => {
            const maxLength = field.getAttribute('maxlength');
            return `Please enter no more than ${maxLength} characters`;
        }
    },
    min: {
        validate: (value: string, field: HTMLInputElement) => {
            const minValue = field.getAttribute('min');
            if (!minValue) return true;
            const numValue = Number(value);
            return !isNaN(numValue) && numValue >= Number(minValue);
        },
        message: (field: HTMLInputElement) => {
            const min = field.getAttribute('min');
            return `Please enter a value greater than or equal to ${min}`;
        }
    },
    max: {
        validate: (value: string, field: HTMLInputElement) => {
            const maxValue = field.getAttribute('max');
            if (!maxValue) return true;
            const numValue = Number(value);
            return !isNaN(numValue) && numValue <= Number(maxValue);
        },
        message: (field: HTMLInputElement) => {
            const max = field.getAttribute('max');
            return `Please enter a value less than or equal to ${max}`;
        }
    },
    pattern: {
        // 正規表現パターンに一致するか確認
        validate: (value, field) => {
            const pattern = field.getAttribute('data-pattern');
            return pattern ? new RegExp(pattern).test(value) : true;
        },
        message: (field) => `Please match the requested format: ${field.getAttribute('data-pattern')}.`,
    },
    url: {
        // URL形式か確認
        validate: (value) => /^(https?:\/\/)?([\w\-]+)+([\w\-.]+)+(:\d+)?(\/[\w\-]*)*(\?[\w\-=&]*)?(#[\w\-]*)?$/.test(value),
        message: () => 'Please enter a valid URL.',
    },
    date: {
        // 有効な日付か確認
        validate: (value) => !isNaN(Date.parse(value)),
        message: () => 'Please enter a valid date.',
    },
    time: {
        // 時間形式か確認
        validate: (value) => /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value),
        message: () => 'Please enter a valid time in HH:MM format.',
    },
    phone: {
        // 電話番号形式か確認
        validate: (value) => /^\+?[0-9\- ]{7,15}$/.test(value),
        message: () => 'Please enter a valid phone number.',
    },
    postalCode: {
        // 郵便番号形式か確認（日本の形式）
        validate: (value) => /^[0-9]{3}-?[0-9]{4}$/.test(value),
        message: () => 'Please enter a valid postal code.',
    },
    equals: {
        // 他のフィールドの値と一致するか確認
        validate: (value, field) => {
            const targetId = field.getAttribute('data-equals');
            const targetField = targetId ? document.getElementById(targetId) as HTMLInputElement : null;
            return targetField ? value === targetField.value : true;
        },
        message: () => 'Values do not match.',
    },
    checkboxRequired: {
        // チェックボックスが選択されているか確認
        validate: (_, field) => (field as HTMLInputElement).checked,
        message: () => 'This checkbox is required.',
    },
    fileRequired: {
        // ファイルがアップロードされているか確認
        validate: (_, field) => {
            const files = (field as HTMLInputElement).files;
            return files !== null && files.length > 0;
        },
        message: () => 'Please upload a file.',
    },
    accepted: {
        // フィールドが承認済みか確認（"yes", "on", "1", "true" を確認）
        validate: (value) => ['yes', 'on', '1', 'true'].includes(value.toLowerCase()),
        message: () => 'This field must be accepted.',
    },
    json: {
        // JSON形式か確認
        validate: (value) => {
            try {
                JSON.parse(value);
                return true;
            } catch {
                return false;
            }
        },
        message: () => 'Please enter a valid JSON string.',
    },
    'checkbox-group': {
        validate: (_, field) => {
            const group = field.closest('fieldset[data-validation="checkbox-group"]');
            if (!group) return true; // グループがない場合は無効としない
    
            const checkboxes = group.querySelectorAll('input[type="checkbox"]');
            const min = parseInt(group.getAttribute('data-group-min') || '0', 10);
            const max = group.getAttribute('data-group-max') ? parseInt(group.getAttribute('data-group-max') || '0', 10) : checkboxes.length;
            const checkedCount = Array.from(checkboxes).filter((checkbox) => (checkbox as HTMLInputElement).checked).length;
    
            if (!group.getAttribute('data-group-min') && checkedCount > max) {
                return false;
            }
            if (!group.getAttribute('data-group-max') && checkedCount < min) {
                return false;
            }
            return checkedCount >= min && checkedCount <= max;
        },
        message: (field) => {
            const group = field.closest('fieldset[data-validation="checkbox-group"]');
            const min = group?.getAttribute('data-group-min') || '0';
            const max = group?.getAttribute('data-group-max') || '∞';
    
            if (!group?.getAttribute('data-group-min')) {
                return `Please select at most ${max} options.`;
            }
            if (!group?.getAttribute('data-group-max')) {
                return `Please select at least ${min} options.`;
            }
            return `Please select between ${min} and ${max} options.`;
        },
    },


    'confirm-email': {
        // メールアドレスが一致するか確認
        validate: (value, field) => {
            const emailInput = field.form?.querySelector('input[data-validation~="email"]') as HTMLInputElement | null;
            if (!emailInput || !emailInput.value) return true;
            return value === emailInput.value;
        },
        message: () => 'Email addresses do not match.',
    },
};
