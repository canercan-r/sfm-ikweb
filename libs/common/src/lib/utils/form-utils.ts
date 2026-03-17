import { UntypedFormGroup, ValidationErrors } from '@angular/forms';

export const getFormValidationErrors = (
  form: UntypedFormGroup
): { control: string; error: string; value: ValidationErrors }[] => {
  const result = [];
  Object.keys(form.controls).forEach((key) => {
    const formProperty = form.get(key);
    if (formProperty instanceof UntypedFormGroup) {
      result.push(...getFormValidationErrors(formProperty));
    }
    const controlErrors: ValidationErrors = formProperty.errors;
    if (controlErrors) {
      Object.keys(controlErrors).forEach((keyError) => {
        result.push({
          control: key,
          error: keyError,
          errorValue: controlErrors[keyError]
        });
      });
    }
  });

  return result;
};

export interface IFormError {
  control: string;
  error: string;
  value: ValidationErrors;
}
