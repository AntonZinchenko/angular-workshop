import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import * as actions from '../actions/orders.actions';
import { Router } from '@angular/router';
import { OrdersService } from '../core/services/orders.service';

@Injectable()
export class OrdersEffects {
  loadOrders$ = createEffect(() => this.actions$.pipe(
    ofType(actions.loadOrders),
    mergeMap(() => this.ordersService.getOrders()
      .pipe(
        map(orders => actions.ordersLoaded({orders})),
        catchError((error) => of(actions.ordersLoadFailed({error})))
      ))
    ));

  createOrder$ = createEffect(() => this.actions$.pipe(
    ofType(actions.addOrder),
    mergeMap(arg => this.ordersService.createOrder(arg.order)
      .pipe(
        map(order => actions.orderAdded({order})),
        catchError((error) => of(actions.orderAddFailed({error})))
      ))
    ));

  updateOrder$ = createEffect(() => this.actions$.pipe(
    ofType(actions.updateOrder),
    mergeMap(arg => this.ordersService.updateOrder(arg.order)
      .pipe(
        map(order => actions.orderUpdated({order})),
        catchError((error) => of(actions.orderUpdateFailed({error})))
      ))
    ));

  deleteOrder$ = createEffect(() => this.actions$.pipe(
    ofType(actions.deleteOrder),
    mergeMap(arg => this.ordersService.deleteOrder(arg.order)
      .pipe(
        map(() => actions.orderDeleted({order: arg.order})),
        catchError((error) => of(actions.orderDeleteFailed({error})))
      ))
    ));

  constructor(
    private actions$: Actions,
    private ordersService: OrdersService,
    private router: Router
  ) {}
}
