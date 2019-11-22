import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';

import { State, getOrders } from 'src/app/+store';
import { Observable, of } from 'rxjs';
import { loadOrders } from '../+store/orders/actions';
import { Order } from '../core/models/order';
import { tap, filter, take, map, switchMap, catchError } from 'rxjs/operators';

@Injectable()
export class OrdersPreloadGuard implements CanActivate {
  constructor(private store: Store<State>) {}

  getFromStoreOrAPI(): Observable<any> {
    return this.store.select(getOrders)
      .pipe(
        tap((orders: Order[]) => {
          if (!orders.length) {
            this.store.dispatch(loadOrders());
          }
        }),
        filter((orders: Order[]) => orders.length > 0),
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
