import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router: Router,
              private products: ProductsFacadeService,
              private cart: CartFacadeService) {
  }

  ngOnInit() {
    this.product$ = this.products.getByUrl$;
  }

  onBuy(product: Product): void {
    if (product) {
      this.cart.addProduct(product);
    }
  }

  onShowProducts() {
    this.router.navigate(['products-list']);
  }
}
