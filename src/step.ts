import { validateField, ValidationRules } from './validation';

export function initializeStepForm(form: HTMLFormElement) {
    const steps = form.querySelectorAll('.step');
    let currentStepIndex = 0;

    const showStep = (index: number) => {
        steps.forEach((step, i) => {
            step.classList.toggle('active', i === index);
        });
    };

    const handleNext = () => {
        const currentStep = steps[currentStepIndex];
        const fields = currentStep.querySelectorAll('input[data-validation]');

        let isValid = true;
        fields.forEach((field) => {
            if (!validateField(field as HTMLInputElement)) {
                isValid = false;
            }
        });

        if (isValid && currentStepIndex < steps.length - 1) {
            currentStepIndex++;
            showStep(currentStepIndex);
        }
    };

    const handlePrevious = () => {
        if (currentStepIndex > 0) {
            currentStepIndex--;
            showStep(currentStepIndex);
        }
    };

    showStep(currentStepIndex);

    form.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        if (target.tagName === 'BUTTON') {
            const action = target.getAttribute('data-action');
            if (action === 'next') {
                handleNext();
            } else if (action === 'previous') {
                handlePrevious();
            }
        }
    });

    return {
        showStep,
        handleNext,
        handlePrevious,
    };
}

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
