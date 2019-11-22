import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { State, getProducts, getProductByUrl } from 'src/app/+store';
import { Product } from 'src/app/core/models/product';
import { updateProduct, deleteProduct, addProduct } from './actions';
import { go, back } from '../router/actions';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductsFacadeService {
  all$: Observable<Product[]>;
  getByUrl$: Observable<Product>;

  constructor(private store: Store<State>,
              private route: ActivatedRoute) {
    this.all$ = this.store.select(getProducts);
    this.getByUrl$ = this.store.select(getProductByUrl);
  }

  addProduct(product: Product) {
    this.store.dispatch(addProduct({ product }));
  }

  updateProduct(product: Product) {
    this.store.dispatch(updateProduct({ product }));
  }

  deleteProduct(product: Product) {
    this.store.dispatch(deleteProduct(({ product })));
  }

  showProductsList() {
    this.store.dispatch(go({ path: ['products-list'] }));
  }

  showFormProduct(id: number = null) {
    if (id) {
      this.store.dispatch(go({ path: ['admin/products/edit', id] }));
    } else {
      this.store.dispatch(go({ path: ['admin/products/add'] }));
    }
  }

  showProductDetails(id: number) {
    this.store.dispatch(go({ path: ['product', id] }));
  }

  cancelEditMode() {
    this.store.dispatch(back());
  }
}
