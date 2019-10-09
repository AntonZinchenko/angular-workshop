import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/core/models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent {
  @Input() product: Product;
  @Output() buy = new EventEmitter<Product>();
  @Output() details = new EventEmitter<number>();

  onBuy(): void {
    this.buy.emit(this.product);
  }

  get canBuy(): boolean {
    return this.product.isAvailable;
  }

  onShowDetails() {
    this.details.emit(this.product.id);
  }
}
