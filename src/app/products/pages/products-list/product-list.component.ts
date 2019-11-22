import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/core/models/product';
import { CartFacadeService } from 'src/app/+store/cart/facade';
import { ProductsFacadeService } from 'src/app/+store/products/facade';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]>;

  constructor(private productsFacade: ProductsFacadeService,
              private cartFacade: CartFacadeService) { }

  ngOnInit() {
    this.products$ = this.productsFacade.all$;
  }

  onBuy(product: Product) {
    this.cartFacade.addProduct(product);
  }

  onShowDetails(productId: number) {
    this.productsFacade.showProductDetails(productId);
  }
}
