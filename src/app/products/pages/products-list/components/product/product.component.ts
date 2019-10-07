import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/core/models/product';
import { ShoppingCartService } from 'src/app/core/services/shopping-cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent {
  @Input() product: Product;
  @Output() buy = new EventEmitter<Product>();

  constructor(private router: Router) {
  }

  onBuy(): void {
    if (this.product) {
      this.buy.emit(this.product);
    }
  }

  onShowDetails() {
    this.router.navigate(['product', this.product.id]);
  }
}
