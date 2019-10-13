import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-cart-list-footer',
  templateUrl: './cart-list-footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartListFooterComponent {
  @Input() totalPrice: number;
  @Input() totalQuantity: number;
}
