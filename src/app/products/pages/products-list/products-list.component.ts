import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from 'src/app/core/models/product';
import { Observable } from 'rxjs';
import { ShoppingCartService } from 'src/app/core/services/shopping-cart.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html'
})
export class ProductsListComponent implements OnInit {
  products$: Observable<Product[]>;

  constructor(private productsService: ProductsService,
              private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
    this.products$ = this.productsService.getProducts();
  }

  onBuy(product: Product) {
    this.shoppingCartService.addProduct(product);
  }
}
