import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Order } from 'src/app/core/models/order';

@Component({
  // tslint:disable-next-line: component-selector
  selector: '[app-admin-order-list-item]',
  templateUrl: './order-list-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminOrderListItemComponent {
  @Input() order: Order;
  @Output() edit = new EventEmitter<Order>();
  @Output() delete = new EventEmitter<Order>();

  onEdit(): void {
    this.edit.emit(this.order);
  }

  onDelete(): void {
    this.delete.emit(this.order);
  }
}
