import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/core/models/product';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartListComponent {
  @Input() products: Product[];
  @Input() totalSum: number;
  @Input() totalQuantity: number;
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
