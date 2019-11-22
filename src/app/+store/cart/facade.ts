import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { State, getCartProducts, getCartTotalSum, getCartTotalQuantity } from 'src/app/+store';
import { Product } from 'src/app/core/models/product';
import { addProduct, increaseQuantity, decreaseQuantity, removeProduct } from './actions';

@Injectable({
  providedIn: 'root'
})
export class CartFacadeService {
  selectedProducts$: Observable<Product[]>;
  totalSum$: Observable<number>;
  totalQuantity$: Observable<number>;

  constructor(private store: Store<State>) {
    this.selectedProducts$ = this.store.select(getCartProducts);
    this.totalSum$ = this.store.select(getCartTotalSum);
    this.totalQuantity$ = this.store.select(getCartTotalQuantity);
  }

  addProduct(product: Product) {
    this.store.dispatch(addProduct({product}));
  }

  increaseQuantity(product: Product) {
    this.store.dispatch(increaseQuantity({product}));
  }

  decreaseQuantity(product: Product) {
    this.store.dispatch(decreaseQuantity({product}));
  }

  removeProduct(product: Product): void {
    this.store.dispatch(removeProduct({product}));
  }
}
