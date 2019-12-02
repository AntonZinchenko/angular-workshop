import { ValidatorFn, AbstractControl } from '@angular/forms';

export function customRequiredValidatorFn(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    return !control.value || !control.value.length ? { fieldEmpty: true } : null;
  };
}
