import { Component, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';
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

  onSubmit(model: ShippingInfo) {
    this.order.emit(model);
  }
}
