import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/core/models/product';
import { CartFacadeService } from 'src/app/+store/facades/cart-facade.service';
import { ProductsFacadeService } from 'src/app/+store/facades/products-facade.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product$: Observable<Product>;

  constructor(private productsFacade: ProductsFacadeService,
              private cart: CartFacadeService) {
  }

  ngOnInit() {
    this.product$ = this.productsFacade.getByUrl$;
  }

  onBuy(product: Product): void {
    if (product) {
      this.cart.addProduct(product);
    }
  }

  onShowProducts() {
    this.productsFacade.showProductsList();
  }
}
