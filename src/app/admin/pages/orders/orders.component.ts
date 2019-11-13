import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/core/models/order';
import { Observable } from 'rxjs';
import { OrdersFacadeService } from 'src/app/+store/facades/orders-facade.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  orders$: Observable<Order[]>;

  constructor(private orders: OrdersFacadeService,
              private router: Router) { }

  ngOnInit() {
    this.orders$ = this.orders.orders$;
  }

  onEditItem(order: Order): void {
    this.router.navigate(['admin/order/edit', order.id]);
  }

  onDeleteItem(order: Order): void {
    if (confirm(`Are you sure to delete order?`)) {
      this.orders.deleteOrder(order);
    }
  }
}
