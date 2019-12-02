import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap, switchMap } from 'rxjs/operators';
import * as actions from './actions';
import { OrdersService } from '../../core/services/orders.service';
import { clearCart } from '../cart/actions';
import { go } from '../router/actions';

@Injectable()
export class OrdersEffects {
  constructor(
    private actions$: Actions,
    private ordersService: OrdersService
  ) { }

  loadOrders$ = createEffect(() => this.actions$.pipe(
    ofType(actions.loadOrders),
    mergeMap(() => this.ordersService.getOrders()
      .pipe(
        map(orders => actions.ordersLoaded({ orders })),
        catchError((error) => of(actions.ordersLoadFailed({ error })))
      ))
  ));

  createOrder$ = createEffect(() => this.actions$.pipe(
    ofType(actions.addOrder),
    mergeMap(arg => this.ordersService.createOrder(arg.order)
      .pipe(
        switchMap(order => [
          actions.orderAdded({ order }),
          clearCart
        ]),
        tap(_ => alert('Order created!')),
        map(url => go({ path: ['products-list'] })),
        catchError((error) => of(actions.orderAddFailed({ error })))
      ))
  ));

  updateOrder$ = createEffect(() => this.actions$.pipe(
    ofType(actions.updateOrder),
    mergeMap(arg => this.ordersService.updateOrder(arg.order)
      .pipe(
        map(order => actions.orderUpdated({ order })),
        catchError((error) => of(actions.orderUpdateFailed({ error })))
      ))
  ));

  orderUpdated$ = createEffect(() => this.actions$.pipe(
    ofType(actions.orderUpdated),
    map(() => go({ path: ['admin'] })))
  );

  deleteOrder$ = createEffect(() => this.actions$.pipe(
    ofType(actions.deleteOrder),
    mergeMap(arg => this.ordersService.deleteOrder(arg.order)
      .pipe(
        map(() => actions.orderDeleted({ order: arg.order })),
        catchError((error) => of(actions.orderDeleteFailed({ error })))
      ))
  ));
}
