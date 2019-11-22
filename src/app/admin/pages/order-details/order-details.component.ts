import { Component, OnInit, OnDestroy } from '@angular/core';
import { Order } from 'src/app/core/models/order';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { OrdersFacadeService } from 'src/app/+store/orders/facade';

@Component({
  selector: 'app-admin-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class AdminOrderDetailsComponent implements OnInit, OnDestroy {
  order: Order;
  private unsubscribe: Subject<void> = new Subject();

  constructor(private ordersFacade: OrdersFacadeService) {
    this.order = {} as Order;
  }

  ngOnInit() {
    this.ordersFacade.getByUrl$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(response => this.order = Object.assign({}, response), err => console.log(err));
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  onSave(model: Order): void {
    this.ordersFacade.updateOrder(model);
  }

  get totalPrice() {
    return (this.order) ? this.order.products.reduce((sum, current) => sum + current.price, 0) : 0;
  }

  onGoBack(): void {
    this.ordersFacade.cancelEditMode();
  }
}
