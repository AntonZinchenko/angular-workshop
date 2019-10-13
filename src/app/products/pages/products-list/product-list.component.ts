import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/core/models/product';
import { ShoppingCartService } from 'src/app/core/services/shopping-cart.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]>;

  constructor(private productsService: ProductsService,
              private shoppingCartService: ShoppingCartService,
              private router: Router) { }

  ngOnInit() {
    this.products$ = this.productsService.getProducts();
  }

  onBuy(product: Product) {
    this.shoppingCartService.addProduct(product);
  }

  onShowDetails(productId: number) {
    this.router.navigate(['product', productId]);
  }
}
