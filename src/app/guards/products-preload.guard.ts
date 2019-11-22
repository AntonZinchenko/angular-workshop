import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';

import { State, getProducts } from 'src/app/+store';
import { Observable, of } from 'rxjs';
import { loadProducts } from '../+store/products/actions';
import { Product } from '../core/models/product';
import { tap, filter, take, map, switchMap, catchError } from 'rxjs/operators';

@Injectable()
export class ProductsPreloadGuard implements CanActivate {
  constructor(private store: Store<State>) {}

  getFromStoreOrAPI(): Observable<any> {
    return this.store.select(getProducts)
      .pipe(
        tap((products: Product[]) => {
          if (!products.length) {
            this.store.dispatch(loadProducts());
          }
        }),
        filter((products: Product[]) => products.length > 0),
        take(1)
    );
  }

  canActivate(): Observable<boolean> {
    return this.getFromStoreOrAPI()
      .pipe(
        switchMap(() => of(true)),
        catchError(() => of(false))
      );
  }
}
