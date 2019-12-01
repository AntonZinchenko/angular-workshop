import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-validator-message',
  templateUrl: './validator-message.component.html',
})
export class ValidatorMessageComponent {
  @Input() field: FormControl;

  public get validatorMessages() {
    const field = this.field;
    if (!field || !field.errors) {
      return false;
    }

    const config = {
      required: 'Field is required',
      fieldEmpty: 'Field is required',
      incorrectEmail: 'Email is incorrect'
    };

    return Object.keys(field.errors)
      .map((error: string) => config[error]);
  }
}
