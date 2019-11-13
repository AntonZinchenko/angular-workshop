import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { State, getProducts, getProductByUrl } from 'src/app/+store/reducers';
import { Product } from 'src/app/core/models/product';
import { updateProduct, deleteProduct, addProduct } from '../actions/products.actions';

@Injectable({
  providedIn: 'root'
})
export class ProductsFacadeService {
  all$: Observable<Product[]>;
  getByUrl$: Observable<Product>;

  constructor(private store: Store<State>) {
    this.all$ = this.store.select(getProducts);
    this.getByUrl$ = this.store.select(getProductByUrl);
  }

  addProduct(product: Product) {
    this.store.dispatch(addProduct({product}));
  }

  updateProduct(product: Product) {
    this.store.dispatch(updateProduct({product}));
  }

  deleteProduct(product: Product) {
    this.store.dispatch(deleteProduct(({product})));
  }
}
