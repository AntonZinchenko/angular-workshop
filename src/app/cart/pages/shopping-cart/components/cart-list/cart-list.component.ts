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
  @Input() totalPrice: number;
  @Input() totalQuantity: number;
  @Output() add = new EventEmitter<Product>();
  @Output() delete = new EventEmitter<Product>();

  onAddProduct(product: Product): void {
    this.add.emit(product);
  }

  onRemoveProduct(product: Product): void {
    this.delete.emit(product);
  }
}
