export type ValidationRule = {
    validate: (value: string, field: HTMLInputElement) => boolean;
    message: (field: HTMLInputElement) => string;
};

export const defaultValidationRules: { [key: string]: ValidationRule } = {
    required: {
        validate: (value) => value.trim().length > 0,
        message: () => 'This field is required.',
    },
    email: {
        validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        message: () => 'Please enter a valid email address.',
    },
    numeric: {
        validate: (value) => /^[0-9]+$/.test(value),
        message: () => 'Please enter a valid number.',
    },
    alphanumeric: {
        validate: (value) => /^[a-zA-Z0-9]+$/.test(value),
        message: () => 'Please enter only letters and numbers.',
    },
    minLength: {
        validate: (value, field) => value.length >= parseInt(field.getAttribute('data-min-length') || '0'),
        message: (field) => `Please enter at least ${field.getAttribute('data-min-length')} characters.`,
    },
    maxLength: {
        validate: (value, field) => value.length <= parseInt(field.getAttribute('data-max-length') || 'Infinity'),
        message: (field) => `Please enter no more than ${field.getAttribute('data-max-length')} characters.`,
    },
    min: {
        validate: (value, field) => parseFloat(value) >= parseFloat(field.getAttribute('data-min') || '0'),
        message: (field) => `Value must be at least ${field.getAttribute('data-min')}.`,
    },
    max: {
        validate: (value, field) => parseFloat(value) <= parseFloat(field.getAttribute('data-max') || 'Infinity'),
        message: (field) => `Value must be no more than ${field.getAttribute('data-max')}.`,
    },
    pattern: {
        validate: (value, field) => {
            const pattern = field.getAttribute('data-pattern');
            return pattern ? new RegExp(pattern).test(value) : true;
        },
        message: (field) => `Please match the requested format: ${field.getAttribute('data-pattern')}.`,
    },
    url: {
        validate: (value) => /^(https?:\/\/)?([\w\-]+)+([\w\-.]+)+(:\d+)?(\/[\w\-]*)*(\?[\w\-=&]*)?(#[\w\-]*)?$/.test(value),
        message: () => 'Please enter a valid URL.',
    },
    date: {
        validate: (value) => !isNaN(Date.parse(value)),
        message: () => 'Please enter a valid date.',
    },
    time: {
        validate: (value) => /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value),
        message: () => 'Please enter a valid time in HH:MM format.',
    },
    phone: {
        validate: (value) => /^\+?[0-9\- ]{7,15}$/.test(value),
        message: () => 'Please enter a valid phone number.',
    },
    postalCode: {
        validate: (value) => /^[0-9]{3}-?[0-9]{4}$/.test(value),
        message: () => 'Please enter a valid postal code.',
    },
    equals: {
        validate: (value, field) => {
            const targetId = field.getAttribute('data-equals');
            const targetField = targetId ? document.getElementById(targetId) as HTMLInputElement : null;
            return targetField ? value === targetField.value : true;
        },
        message: () => 'Values do not match.',
    },
    checkboxRequired: {
        validate: (_, field) => (field as HTMLInputElement).checked,
        message: () => 'This checkbox is required.',
    },
    fileRequired: {
        validate: (_, field) => {
            const files = (field as HTMLInputElement).files;
            return files !== null && files.length > 0;
        },
        message: () => 'Please upload a file.',
    },
    accepted: {
        validate: (value) => ['yes', 'on', '1', 'true'].includes(value.toLowerCase()),
        message: () => 'This field must be accepted.',
    },
    json: {
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
    'multi-check': {
        validate: (_, field) => {
            // チェックボックスグループを特定
            const group = field.closest('[data-validation="group"]');
            if (!group) return true; // グループが指定されていない場合はスキップ

            // グループ内のすべてのチェックボックスを取得
            const checkboxes = group.querySelectorAll('input[data-validation="multi-check"]');

            // 最小・最大値を取得
            const min = parseInt(group.getAttribute('data-group-min') || '1', 10);
            const max = parseInt(group.getAttribute('data-group-max') || `${checkboxes.length}`, 10);

            // チェックされたボックスの数
            const checkedCount = Array.from(checkboxes).filter((checkbox) => (checkbox as HTMLInputElement).checked).length;

            // 最小・最大値の範囲内かを確認
            return checkedCount >= min && checkedCount <= max;
        },
        message: (field) => {
            const group = field.closest('[data-validation="group"]');
            if (!group) return 'Validation error in group.';

            const min = group.getAttribute('data-group-min') || '1';
            const max = group.getAttribute('data-group-max') || '∞';

            return `Please select at least ${min} and at most ${max} options.`;
        },
    },
    'confirm-email': {
        validate: (value, field) => {
            const emailInput = field.form?.querySelector('input[data-validation~="email"]') as HTMLInputElement | null;
            if (!emailInput || !emailInput.value) return true;
            return value === emailInput.value;
        },
        message: () => 'Email addresses do not match.',
    },
};



// グローバルなバリデーションルールを保持
export const ValidationRules: { [key: string]: ValidationRule } = { ...defaultValidationRules };

// カスタムルールを追加する関数
export function addCustomValidationRules(customRules: { [key: string]: ValidationRule }) {
    Object.assign(ValidationRules, customRules);
}

// フィールドをバリデートする関数
export function validateField(field: HTMLInputElement): boolean {
    const validationTypes = field.getAttribute('data-validation')?.split(' ') || [];
    let isValid = true;
    let errorMessage: string | null = null;

    // 特別なrequiredバリデーションがない場合、HTMLのrequiredをチェック
    if (!validationTypes.includes('required') && field.hasAttribute('required')) {
        if (field.value.trim().length === 0) {
            isValid = false;
            errorMessage = field.getAttribute('data-validation-required-message') || 'This field is required.';
        }
    }

    // data-validation属性で指定されたすべてのルールをチェック
    for (const type of validationTypes) {
        const rule = ValidationRules[type];
        if (rule && !rule.validate(field.value, field)) {
            const customMessage = field.getAttribute(`data-validation-${type}-message`);
            errorMessage = customMessage || rule.message(field);
            isValid = false;
            break;
        }
    }

    // エラー要素を柔軟に検索
    const group = field.closest('[data-validation="group"]'); // グループを探す
    const errorElement = group
        ? (group.querySelector('[data-validation="error"]') as HTMLElement) // グループ内のエラー要素
        : (field.parentElement?.querySelector('[data-validation="error"]') as HTMLElement) || // 親要素内のエラー要素
          (document.querySelector(`[data-validation="error"][data-for="${field.id}"]`) as HTMLElement); // グローバル検索

    // エラー要素にメッセージを表示
    if (isValid && errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    } else if (!isValid && errorElement) {
        errorElement.textContent = errorMessage || '';
        errorElement.style.display = 'block';
    }

    return isValid;
}



// フォーム全体をバリデートする関数
export function validateForm(form: HTMLFormElement): boolean {
    let isValid = true;
    const fields = form.querySelectorAll('input[data-validation]');

    fields.forEach((field) => {
        if (!validateField(field as HTMLInputElement)) {
            isValid = false;
        }
    });

    return isValid;
}

type FormousOptions = {
    formSelector: string;
    validationMessages?: { [key: string]: string };
};

export function Formous(options: FormousOptions) {
    const customMessages = options.validationMessages || {};

    // カスタムメッセージを反映したバリデーションルールを生成
    const validationRules = { ...defaultValidationRules };
    for (const [key, rule] of Object.entries(validationRules)) {
        if (customMessages[key]) {
            validationRules[key] = {
                ...rule,
                message: () => customMessages[key], // オプションのメッセージを設定
            };
        }
    }

    function validateField(field: HTMLInputElement): boolean {
        const validationTypes = field.getAttribute('data-validation')?.split(' ') || [];
        let isValid = true;
        let errorMessage: string | null = null;

        for (const type of validationTypes) {
            const rule = validationRules[type];
            if (rule && !rule.validate(field.value, field)) {
                // カスタム属性メッセージ > オプションメッセージ > デフォルトメッセージの順で取得
                const customMessage = field.getAttribute(`data-validation-${type}-message`);
                errorMessage = customMessage || rule.message(field);
                isValid = false;
                break;
            }
        }

        // エラーメッセージを表示
        const errorElement = field.parentElement?.querySelector(
            '[data-validation="error"]'
        ) as HTMLElement;
        if (isValid && errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        } else if (!isValid && errorElement) {
            errorElement.textContent = errorMessage || '';
            errorElement.style.display = 'block';
        }

        return isValid;
    }

    function validateForm(form: HTMLFormElement): boolean {
        let isValid = true;
        const fields = form.querySelectorAll('input[data-validation]');

        fields.forEach((field) => {
            if (!validateField(field as HTMLInputElement)) {
                isValid = false;
            }
        });

        return isValid;
    }

    const form = document.querySelector(options.formSelector) as HTMLFormElement;
    if (form) {
        form.addEventListener('submit', (event) => {
            if (!validateForm(form)) {
                event.preventDefault();
            }
        });
    } else {
        console.log("Form not found with selector:", options.formSelector);
    }
}
