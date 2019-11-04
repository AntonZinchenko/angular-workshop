import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/core/models/product';
import { Store } from '@ngrx/store';
import { State, getProducts } from 'src/app/+store/reducers';
import { addProduct } from 'src/app/+store/actions/cart.actions';
import { loadProducts } from 'src/app/+store/actions/products.actions';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]>;

  constructor(private store: Store<State>,
              private router: Router) { }

  ngOnInit() {
    this.products$ = this.store.select(getProducts);
  }

  onBuy(product: Product) {
    this.store.dispatch(addProduct({product}));
  }

  onShowDetails(productId: number) {
    this.router.navigate(['product', productId]);
  }
}
