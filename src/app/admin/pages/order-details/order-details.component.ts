import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/core/models/order';
import { OrdersService } from 'src/app/core/services/orders.service';
import { switchMap, tap, map, take } from 'rxjs/operators';

@Component({
  selector: 'app-admin-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class AdminOrderDetailsComponent implements OnInit {
  order: Order;

  constructor(private ordersService: OrdersService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => this.ordersService.getOrder(+params.get('id'))))
        .subscribe(order => this.order = Object.assign({}, order), err => console.log(err));
  }

  onSave(order: Order): void {
    const actionResult = (!order.id)
      ? this.ordersService.createOrder(order)
      : this.ordersService.updateOrder(order);

    actionResult.pipe(take(1))
      .subscribe(() => this.onGoBack(), err => console.log(err));
  }

  get totalPrice() {
    return this.order.products.reduce((sum, current) => sum + current.price, 0);
  }

  onGoBack(): void {
    this.router.navigate(['../../../'], { relativeTo: this.route });
  }
}
