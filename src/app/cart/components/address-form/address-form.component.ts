import { Component, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';
import { Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { ShippingInfo } from 'src/app/core/models/shipping-info';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressFormComponent {
  @Input() address: ShippingInfo;
  @Output() order = new EventEmitter<ShippingInfo>();

  form: AbstractControl;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      shippingCity: ['', [Validators.required]],
      shippingAddress: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.order.emit(new ShippingInfo(this.form.value));
  }
}
