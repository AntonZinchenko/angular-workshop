import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/core/models/order';
import { OrdersService } from 'src/app/core/services/orders.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  orders$: Observable<Order[]>;

  constructor(private ordersService: OrdersService,
              private router: Router) { }

  ngOnInit() {
    this.orders$ = this.ordersService.getOrders();
  }

  onEditItem(order: Order): void {
    this.router.navigate(['admin/order/edit', order.id]);
  }

  onDeleteItem(order: Order): void {
    if (confirm(`Are you sure to delete order?`)) {
      this.orders$ = this.ordersService.deleteOrder(order)
        .pipe(switchMap(() => this.ordersService.getOrders()));
    }
  }
}
