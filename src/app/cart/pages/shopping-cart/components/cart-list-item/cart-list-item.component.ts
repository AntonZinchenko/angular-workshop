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
  @Output() add = new EventEmitter<Product>();
  @Output() delete = new EventEmitter<Product>();

  onAddProduct(product: Product): void {
    this.add.emit(product);
  }

  onRemoveProduct(product: Product): void {
    this.delete.emit(product);
  }
}
