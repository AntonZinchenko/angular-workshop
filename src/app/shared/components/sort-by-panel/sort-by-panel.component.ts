import { Component, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';
import { OrderType } from 'src/app/core/models/shipping-info';

@Component({
  selector: 'app-sort-by-panel',
  templateUrl: './sort-by-panel.component.html',
  styleUrls: ['./sort-by-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SortByPanelComponent {
  @Input() field: OrderType;
  @Input() isAsc: boolean;
  @Output() switchOrderField = new EventEmitter<OrderType>();
  @Output() switchOrderDirection = new EventEmitter<boolean>();

  get orderValues() {
    return Object.values(OrderType);
  }

  onSwitchOrderField(newField: string) {
    this.switchOrderField.emit(newField as OrderType);
  }

  onSwitchOrderDirection() {
    this.switchOrderDirection.emit(!this.isAsc);
  }
}
