import { validateField, smoothScroll } from './validation';
import { FormousOptions } from './types';

// ステップフォームを初期化する関数
export function initializeStepForm(
    form: HTMLFormElement,
    options?: FormousOptions
) {
    const {
        progressFillSelector = '#progress-fill',
        indicatorSelector = '.step-indicator',
        progressSelector = '#step-progress'
    } = options || {};

    let steps = Array.from(form.querySelectorAll('.step'));
    const progressBarFill = form.querySelector(progressFillSelector) as HTMLElement;
    const stepIndicators = form.querySelectorAll(indicatorSelector);
    const stepProgress = form.querySelector(progressSelector) as HTMLElement;
    const currentStepElement = form.querySelector('[data-step-current]') as HTMLElement;
    const totalStepElement = form.querySelector('[data-step-total]') as HTMLElement;
    let currentStepIndex = 0;

    const updateProgressBar = () => {
        const progressPercentage = ((currentStepIndex + 1) / steps.length) * 100;
        if (progressBarFill) progressBarFill.style.width = `${progressPercentage}%`;
        if (stepProgress) stepProgress.setAttribute('aria-valuenow', String(progressPercentage));

        stepIndicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index <= currentStepIndex);
        });

        if (currentStepElement) {
            currentStepElement.textContent = String(currentStepIndex + 1);
        }
        if (totalStepElement) {
            totalStepElement.textContent = String(steps.length);
        }
    };

    const validateCurrentStep = (): boolean => {
        const currentStep = steps[currentStepIndex];
        const fields = currentStep.querySelectorAll(
            'input, textarea, select, [contenteditable="true"], ' + 
            'button[role="combobox"], div[role="listbox"], ' +
            'div[role="slider"], div[role="spinbutton"]'
        );

        let isValid = true;
        fields.forEach((field) => {
            if (!validateField(field as HTMLInputElement, options)) {
                isValid = false;
            }
        });

        return isValid;
    };

    const showStep = (index: number) => {
        steps.forEach((step, i) => {
            step.classList.toggle('active', i === index);
        });
        currentStepIndex = index;
        updateProgressBar();

        const currentStep = steps[currentStepIndex];
        
        if (currentStep.classList.contains('confirmation-step')) {
            updateConfirmationPage(steps[currentStepIndex - 1], currentStep);
        }

        const nextButton = currentStep.querySelector('[data-action="next"]');
        if (nextButton) {
            (nextButton as HTMLElement).style.display = 'inline-block';
        }
    };

    const updateConfirmationPage = (_formStep: Element, confirmationStep: Element) => {
        // 各セクションごとに処理
        const confirmationSections = confirmationStep.querySelectorAll('.confirmation-section');
        // デリミタの取得（デフォルトは','）
        const delimiter = options?.confirmationOptions?.delimiter || ',';
        
        confirmationSections.forEach(section => {
            const stepNumber = section.getAttribute('data-step');
            if (!stepNumber) return;
            
            // セクション内の確認項目を更新
            const confirmSpans = section.querySelectorAll('[data-confirm]');
            confirmSpans.forEach(span => {
                const fieldName = span.getAttribute('data-confirm');
                if (!fieldName) return;
                
                // 対応する入力フィールドを検索
                const field = form.querySelector(`[name="${fieldName}"]`);
                if (!field) return;
                let value = '';
                switch ((field as HTMLInputElement).type) {
                    case 'checkbox':
                        // チェックボックスグループの場合
                        const checkedBoxes = form.querySelectorAll(`input[name="${fieldName}"]:checked`);
                        value = Array.from(checkedBoxes)
                            .map(cb => (cb as HTMLInputElement).labels?.[0]?.textContent || (cb as HTMLInputElement).value)
                            .join(delimiter);
                        break;
                    case 'radio':
                        const checkedRadio = form.querySelector(`input[name="${fieldName}"]:checked`) as HTMLInputElement;
                        value = checkedRadio ? (checkedRadio.labels?.[0]?.textContent || checkedRadio.value) : '';
                        break;
                    default:
                        value = (field as HTMLInputElement).value;
                }
                
                span.textContent = value || '未入力';
            });
        });
    };

    const handleNext = () => {
        const isValid = validateCurrentStep();
        if (!isValid) {
            const currentStep = steps[currentStepIndex];
            const firstErrorField = currentStep.querySelector('input:invalid, textarea:invalid, select:invalid') as HTMLElement;
            if (firstErrorField) {
                smoothScroll(firstErrorField, options?.scrollOptions);
            }
            return;
        }
        
        if (currentStepIndex < steps.length - 1) {
            showStep(currentStepIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentStepIndex > 0) {
            showStep(currentStepIndex - 1);
        }
    };

    const handleIndicatorClick = (index: number) => {
        if (index > currentStepIndex && !validateCurrentStep()) {
            return;
        }
        showStep(index);
    };

    showStep(currentStepIndex);

    form.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        if (target.hasAttribute('data-action')) {
            const action = target.getAttribute('data-action');
            if (action === 'next' || action === 'confirm') handleNext();
            else if (action === 'previous') handlePrevious();
            else if (action === 'edit') {
                const targetStep = parseInt(target.getAttribute('data-target-step') || '1') - 1;
                showStep(targetStep);
            }
        }
    });

    stepIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => handleIndicatorClick(index));
    });

    return {
        showStep,
        handleNext,
        handlePrevious,
        updateProgressBar
    };
}

const validationRules = {
    required: {
        message: 'This field is required'
    }
};

const customRule = validationRules['required'];
if (customRule) {
    console.log(`Custom rule found: ${customRule.message}`);
}
