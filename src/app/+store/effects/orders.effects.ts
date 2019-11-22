import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap, switchMap } from 'rxjs/operators';
import * as actions from '../actions/orders.actions';
import { OrdersService } from '../../core/services/orders.service';
import { clearCart } from '../actions/cart.actions';
import { go } from '../actions/router.actions';

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
        catchError((error) => of(actions.orderAddFailed({ error })))
      ))
  ));

  orderCreated$ = createEffect(() => this.actions$.pipe(
    ofType(actions.orderAdded),
    map(() => {
      alert('Order created!');
      return go({ path: ['products-list'] });
    }))
  );

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
