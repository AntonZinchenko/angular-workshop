import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-cart-list-footer',
  templateUrl: './cart-list-footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartListFooterComponent {
  @Input() totalSum: number; // можно попробовать применить такой тип, как tuple [number, number]
  @Input() totalQuantity: number;
}
