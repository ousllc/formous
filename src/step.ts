import { validateField as importedValidateField, ValidationRules } from './validation';
import { FormousOptions } from './types';

// ステップフォームを初期化する関数
export function initializeStepForm(form: HTMLFormElement, enableConfirmationPage: boolean = false, options?: FormousOptions) {
    let steps = Array.from(form.querySelectorAll('.step'));
    const progressBarFill = form.querySelector('#progress-fill') as HTMLElement;
    const stepIndicators = form.querySelectorAll('.step-indicator');
    const stepProgress = form.querySelector('#step-progress') as HTMLElement;
    let currentStepIndex = 0;

    if (enableConfirmationPage) {
        let confirmationStep = form.querySelector('.step[data-confirmation="true"]') as HTMLElement | null;

        if (!confirmationStep) {
            confirmationStep = document.createElement('div');
            confirmationStep.classList.add('step');
            confirmationStep.setAttribute('data-confirmation', 'true');
            confirmationStep.innerHTML = `
              <h3>Confirmation</h3>
              <div id="confirmation-content"></div>
              <button type="button" data-action="previous">Back</button>
              <button type="submit">Submit</button>
            `;
            form.appendChild(confirmationStep);
        }
        steps = Array.from(form.querySelectorAll('.step'));
    }

    const updateConfirmationPage = (options: FormousOptions) => {
        const confirmationStep = form.querySelector('.step[data-confirmation="true"]') as HTMLElement | null;
        if (!confirmationStep) return;

        // data-confirm属性を持つ要素をすべて取得
        const confirmElements = confirmationStep.querySelectorAll('[data-confirm]');
        
        confirmElements.forEach(element => {
            const fieldName = element.getAttribute('data-confirm');
            if (!fieldName) return;

            // チェックボックスグループの処理
            const fieldset = form.querySelector(`fieldset input[name="${fieldName}"]`)?.closest('fieldset');
            if (fieldset) {
                const checkedBoxes = form.querySelectorAll(`input[name="${fieldName}"]:checked`);
                const labels = Array.from(checkedBoxes).map(checkbox => {
                    const label = checkbox.nextElementSibling as HTMLElement;
                    return label?.textContent || '';
                }).filter(Boolean);

                const delimiter = options.confirmationOptions?.delimiter || ',';
                element.textContent = labels.join(delimiter);
            } else {
                // 通常のinput要素の処理
                const field = form.querySelector(`[name="${fieldName}"]`) as HTMLInputElement;
                if (field) {
                    element.textContent = field.value || '未入力';
                } else {
                    element.textContent = '未入力';
                }
            }
        });
    };

    const updateProgressBar = () => {
        const progressPercentage = ((currentStepIndex + 1) / steps.length) * 100;
        if (progressBarFill) progressBarFill.style.width = `${progressPercentage}%`;

        stepIndicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index <= currentStepIndex);
        });

        if (stepProgress) {
            stepProgress.textContent = `Step ${currentStepIndex + 1}/${steps.length}`;
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
            if (!importedValidateField(field as HTMLInputElement, options)) {
                isValid = false;
            }
        });

        return isValid;
    };

    const showStep = (index: number) => {
        steps.forEach((step, i) => step.classList.toggle('active', i === index));
        currentStepIndex = index;
        updateProgressBar();

        const currentStep = steps[currentStepIndex];
        const nextButton = currentStep.querySelector('[data-action="next"]') as HTMLButtonElement | null;
        const confirmButton = currentStep.querySelector('[data-action="confirm"]') as HTMLButtonElement | null;

        if (enableConfirmationPage && currentStepIndex === steps.length - 2) {
            if (nextButton) nextButton.style.display = 'none';
            if (confirmButton) confirmButton.style.display = 'inline-block';
        } else {
            if (nextButton) nextButton.style.display = 'inline-block';
            if (confirmButton) confirmButton.style.display = 'none';
        }
        if (enableConfirmationPage && currentStepIndex === steps.length - 1) {
            updateConfirmationPage(options || {
                formSelector: '#step-form',
                confirmationOptions: {
                    delimiter: '、'
                }
            });
        }
    };

    const handleNext = () => {
        if (validateCurrentStep() && currentStepIndex < steps.length - 1) {
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
            alert('Please fix the errors before proceeding.');
            return;
        }
        showStep(index);
    };

    showStep(currentStepIndex);

    form.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        if (target.tagName === 'BUTTON') {
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
        updateProgressBar,
        updateConfirmationPage,
    };
}

const customRule = ValidationRules['required'];
if (customRule) {
    console.log(`Custom rule found: ${customRule.message}`);
}
