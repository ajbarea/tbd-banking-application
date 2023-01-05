import { Directive } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';

export const passwordMismatchValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password');
  const repassword = control.get('repassword');

  return password && repassword && password.value !== repassword.value
    ? { passwordMismatch: true }
    : null;
};

@Directive({
  selector: '[appPasswordMatch]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordMatchDirective,
      multi: true,
    },
  ],
})
export class PasswordMatchDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return passwordMismatchValidator(control);
  }
}
