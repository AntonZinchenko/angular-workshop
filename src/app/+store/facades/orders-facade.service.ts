import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { getOrders, State, getOrderByUrl } from 'src/app/+store/reducers';
import { Order } from 'src/app/core/models/order';
import { deleteOrder, updateOrder, addOrder } from '../actions/orders.actions';
import { go, back } from '../actions/router.actions';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OrdersFacadeService {
  orders$: Observable<Order[]>;
  getByUrl$: Observable<Order>;

  constructor(private store: Store<State>,
              private route: ActivatedRoute) {
    this.orders$ = this.store.select(getOrders);
    this.getByUrl$ = this.store.select(getOrderByUrl);
  }

  createOrder(order: Order) {
    this.store.dispatch(addOrder({order}));
  }

  updateOrder(order: Order) {
    this.store.dispatch(updateOrder({order}));
  }

  deleteOrder(order: Order) {
    this.store.dispatch(deleteOrder(({order})));
  }

  showOrderForm(id: number) {
    this.store.dispatch(go({ path: ['admin/order/edit', id] }));
  }

  cancelEditMode() {
    this.store.dispatch(back());
  }
}
