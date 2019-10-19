import { Pipe, PipeTransform } from '@angular/core';
import { Product, ProductGroup } from 'src/app/core/models/product';
import { OrderType } from 'src/app/core/models/shipping-info';

@Pipe({ name: 'orderBy' })
export class OrderByPipe implements PipeTransform {
  transform(value: Array<Product>, field: OrderType, isAsc: boolean): Array<ProductGroup> {
    const groupedvalues = this.groupByProduct(value);

    switch (field) {
      case OrderType.Title:
      case OrderType.Price:
      case OrderType.Quantity:
        return groupedvalues.sort((a, b) => this.sortByField(a, b, field, isAsc));
      default:
        return groupedvalues;
    }
  }

  private groupByProduct(value: Array<Product>): Array<ProductGroup> {
    const keyFiled = 'id';
    const groupedObj = value.reduce((prev, cur) => {
      if (!prev[cur[keyFiled]]) {
        prev[cur[keyFiled]] = [cur];
      } else {
        prev[cur[keyFiled]].push(cur);
      }
      return prev;
    }, {});

    return Object.keys(groupedObj).map(key => new ProductGroup(key, groupedObj[key]));
  }

  private sortByField(a: ProductGroup, b: ProductGroup, field: string, isAsc: boolean) {
    let comparison = 0;
    if (a[field] > b[field]) {
      comparison = 1;
    }
    if (a[field] < b[field]) {
      comparison = -1;
    }
    return isAsc ? comparison : comparison * -1;
  }
}
