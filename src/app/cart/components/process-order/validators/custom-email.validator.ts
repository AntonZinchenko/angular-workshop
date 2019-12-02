import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export const emailValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const regExp = new RegExp('[a-zA-Z0-9_\\.\\+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-\\.]+');
  return !control.value || !regExp.test(control.value) ? { incorrectEmail: true } : null;
};
