import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/core/models/product';

@Component({
  selector: 'app-cart-list-item',
  templateUrl: './cart-list-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartListItemComponent {
  @Input() product: Product;
  @Input() quantity: number;
  @Output() increase = new EventEmitter<Product>();
  @Output() decrease = new EventEmitter<Product>();
  @Output() remove = new EventEmitter<Product>();

  onIncrease(product: Product): void {
    this.increase.emit(product);
  }

  onDecrease(product: Product): void {
    this.decrease.emit(product);
  }

  onRemoveProduct(product: Product): void {
    this.remove.emit(product);
  }
}
