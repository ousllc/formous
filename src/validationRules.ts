import { FormousOptions } from './types';

// バリデーションルールの型定義
export type ValidationRule = {
    validate: (value: string, field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement, options?: FormousOptions) => boolean;
    message: (field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement, options?: FormousOptions) => string;
};

// デフォルトのバリデーションルールセット
export const defaultValidationRules: { [key: string]: ValidationRule } = {
    required: {
        // 入力が空でないか確認
        validate: (value, field) => {
            // data-validation="required" または required 属性があれば検証
            const isRequired = field.hasAttribute('required') || 
                field.getAttribute('data-validation')?.includes('required') ||
                field.closest('fieldset[data-validation="required"]') !== null;
            
            // チェックボックスの場合は、チェック状態を確認
            if (isRequired && field instanceof HTMLInputElement && field.type === 'checkbox') {
                return field.checked;
            }
            
            // ラジオボタンの場合は、グループ内のいずれかが選択されているかチェック
            if (isRequired && field.type === 'radio') {
                const name = field.getAttribute('name');
                if (name) {
                    const checkedRadio = field.closest('form')?.querySelector(`input[name="${name}"]:checked`);
                    return !!checkedRadio;
                }
            }
            
            // セレクトボックスの場合は、選択されている値が空でないかを確認
            if (isRequired && field instanceof HTMLSelectElement) {
                return field.value !== '';
            }
            
            return !isRequired || value.trim().length > 0;
        },
        message: (field) => {
            // カスタムメッセージがある場合はそれを使用し、
            // ない場合はデフォルトメッセージを使用するはず...
            return field.getAttribute('data-validation-message') || 'このフィールドは必須です';
        },
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
        validate: (value: string, field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) => {
            const maxLength = field.getAttribute('maxlength');
            if (!maxLength) return true;
            return value.length <= Number(maxLength);
        },
        message: (field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) => {
            const maxLength = field.getAttribute('maxlength');
            return `Please enter no more than ${maxLength} characters`;
        }
    },
    min: {
        validate: (value: string, field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) => {
            const minValue = field.getAttribute('min');
            if (!minValue) return true;
            const numValue = Number(value);
            return !isNaN(numValue) && numValue >= Number(minValue);
        },
        message: (field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) => {
            const min = field.getAttribute('min');
            return `Please enter a value greater than or equal to ${min}`;
        }
    },
    max: {
        validate: (value: string, field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) => {
            const maxValue = field.getAttribute('max');
            if (!maxValue) return true;
            const numValue = Number(value);
            return !isNaN(numValue) && numValue <= Number(maxValue);
        },
        message: (field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) => {
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
        validate: (value) => {
            if (!value) return true;
            return /^https?:\/\/([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/.test(value);
        },
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
        validate: (value, field) => {
            const country = field.getAttribute('data-country') || 'JP';
            const patterns = {
                JP: /^[0-9]{3}-[0-9]{4}$/,  // ハイフンを必須に変更（123-4567のみ許可）
                US: /^\d{5}(-\d{4})?$/,
                UK: /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i,
                CA: /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ ]?\d[ABCEGHJ-NPRSTV-Z]\d$/i,
                DE: /^\d{5}$/,
                FR: /^\d{5}$/,
                AU: /^\d{4}$/,
                IT: /^\d{5}$/,
                ES: /^\d{5}$/,
                NL: /^\d{4}[ ]?[A-Z]{2}$/,
                CN: /^\d{6}$/
            };
            
            const pattern = patterns[country as keyof typeof patterns];
            if (!pattern) return true;
            
            return !value || pattern.test(value);
        },
        message: (field) => {
            const country = field.getAttribute('data-country') || 'JP';
            const messages = {
                JP: '郵便番号は123-4567の形式（ハイフン必須）で入力してください',
                US: 'Please enter a ZIP code in the format 12345 or 12345-6789',
                UK: 'Please enter a valid postcode (e.g., AA9A 9AA)',
                CA: 'Please enter a valid postal code (e.g., A1A 1A1)',
                DE: 'Bitte geben Sie eine gültige Postleitzahl ein (z.B. 12345)',
                FR: 'Veuillez entrer un code postal valide (ex: 12345)',
                AU: 'Please enter a valid postcode (e.g., 1234)',
                IT: 'Inserisci un codice postale valido (es. 12345)',
                ES: 'Por favor, introduzca un código postal válido (ej. 12345)',
                NL: 'Voer een geldige postcode in (bijv. 1234 AB)',
                CN: '请输入有效的邮政编码（例：123456）'
            };
            
            return messages[country as keyof typeof messages] || '正しい郵便番号形式で入力してください';
        }
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
        validate: (_value, field) => {
            const group = field.closest('[data-validation="checkbox-group"]');
            if (!group) return true;
    
            const checkboxes = group.querySelectorAll('input[type="checkbox"]');
            const min = parseInt(group.getAttribute('data-group-min') || '0', 10);
            const max = group.getAttribute('data-group-max') ? parseInt(group.getAttribute('data-group-max') || '0', 10) : checkboxes.length;
            const checkedCount = Array.from(checkboxes).filter((checkbox) => (checkbox as HTMLInputElement).checked).length;
    
            return checkedCount >= min && checkedCount <= max;
        },
        message: (field, options) => {
            // オプションでメッセージが指定されている場合はそれを使用
            if (options?.validationMessages?.['checkbox-group']) {
                return typeof options.validationMessages['checkbox-group'] === 'function'
                    ? options.validationMessages['checkbox-group'](field as HTMLInputElement)
                    : options.validationMessages['checkbox-group'];
            }

            const group = field.closest('[data-validation="checkbox-group"]');
            const min = group?.getAttribute('data-group-min') || '0';
            const max = group?.getAttribute('data-group-max') || '∞';
    
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
    password: {
        validate: (value: string, _field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement, options?: FormousOptions) => {
            const config = options?.validationPatterns?.password || {};
            const minLength = config.minLength ?? 8;
            const maxLength = config.maxLength ?? 100;
            const requireUppercase = config.requireUppercase ?? true;
            const requireNumber = config.requireNumber ?? true;
            const requireSymbol = config.requireSymbol ?? true;
            
            if (value.length < minLength || value.length > maxLength) return false;
            if (requireUppercase && !/[A-Z]/.test(value)) return false;
            if (requireNumber && !/\d/.test(value)) return false;
            if (requireSymbol && !/[!@#$%^&*]/.test(value)) return false;
            
            return true;
        },
        message: (_field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement, options?: FormousOptions) => {
            const config = options?.validationPatterns?.password || {};
            const minLength = config.minLength ?? 8;
            const maxLength = config.maxLength ?? 100;
            const requireUppercase = config.requireUppercase ?? true;
            const requireNumber = config.requireNumber ?? true;
            const requireSymbol = config.requireSymbol ?? true;
            
            const requirements = [];
            requirements.push(`at least ${minLength} characters${maxLength !== 100 ? `, maximum ${maxLength} characters` : ''}`);
            if (requireUppercase) requirements.push('uppercase letter');
            if (requireNumber) requirements.push('number');
            if (requireSymbol) requirements.push('special character (!@#$%^&*)');
    
            return `Password must contain ${requirements.join(', ')}`;
        }
    },
    halfwidthKatakana: {
        validate: (value: string, _field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) => {
            if (!value) return true;
            // 半角カタカナの正規表現
            return /^[ｦ-ﾟ]+$/.test(value);
        },
        message: () => '半角カタカナで入力してください。',
    },
    zenkaku: {
        validate: (value) => {
            if (!value) return true;
            // 全角文字（ひらがな・カタカナ・漢字・全角英数字・記号）の正規表現
            return /^[^\x01-\x7E\xA1-\xDF]+$/.test(value);
        },
        message: () => '全角文字で入力してください。',
    },
};
