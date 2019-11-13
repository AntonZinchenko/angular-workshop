import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/core/models/product';
import { CartFacadeService } from 'src/app/+store/facades/cart-facade.service';
import { ProductsFacadeService } from 'src/app/+store/facades/products-facade.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]>;

  constructor(private products: ProductsFacadeService,
              private cart: CartFacadeService,
              private router: Router) { }

  ngOnInit() {
    this.products$ = this.products.all$;
  }

  onBuy(product: Product) {
    this.cart.addProduct(product);
  }

  onShowDetails(productId: number) {
    this.router.navigate(['product', productId]);
  }
}
