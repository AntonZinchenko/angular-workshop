import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/core/models/product';

@Component({
  selector: 'app-user-selection',
  templateUrl: './user-selection.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserSelectionComponent {
  @Input() products: Product[] = [];
  @Output() delete = new EventEmitter<Product>();

  get totalPrice() {
    let totalPrice = 0;
    if (this.products) {
      this.products.forEach(i => totalPrice += i.price);
    }

    return totalPrice;
  }

  onRemoveProduct(product: Product): void {
    this.delete.emit(product);
  }
}
