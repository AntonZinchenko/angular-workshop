import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/core/models/order';
import { Observable } from 'rxjs';
import { deleteOrder } from 'src/app/actions/orders.actions';
import { getOrders, State } from 'src/app/reducers';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  orders$: Observable<Order[]>;

  constructor(private store: Store<State>,
              private router: Router) { }

  ngOnInit() {
    this.orders$ = this.store.select(getOrders);
  }

  onEditItem(order: Order): void {
    this.router.navigate(['admin/order/edit', order.id]);
  }

  onDeleteItem(order: Order): void {
    if (confirm(`Are you sure to delete order?`)) {
      this.store.dispatch(deleteOrder(({order})));
    }
  }
}
