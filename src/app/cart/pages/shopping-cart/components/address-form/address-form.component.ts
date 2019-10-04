import { Component, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';
import { ShippingInfo } from 'src/app/core/models/shipping-info';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressFormComponent {
  @Input() address: ShippingInfo;
  @Output() order = new EventEmitter<ShippingInfo>();

  createOrder(model: ShippingInfo) {
    this.order.emit(model);
  }
}
