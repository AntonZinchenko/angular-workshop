import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCartService } from 'src/app/core/services/shopping-cart.service';
import { Product } from 'src/app/core/models/product';
import { ShippingInfo, OrderType } from 'src/app/core/models/shipping-info';
import { Observable, Subject } from 'rxjs';
import { OrdersService } from 'src/app/core/services/orders.service';
import { Order } from 'src/app/core/models/order';
import { take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

  products: Product[];
  totalSum$: Observable<number>;
  totalQuantity$: Observable<number>;
  shippingInfo: ShippingInfo = new ShippingInfo();
  field: OrderType = OrderType.Quantity;
  isAsc: boolean;

  private unsubscribe: Subject<void> = new Subject();

  constructor(private shoppingCartService: ShoppingCartService,
              private ordersService: OrdersService,
              private router: Router) {
  }

  ngOnInit() {
    this.shoppingCartService.productsInCart$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        response => this.products = response,
        err => console.log(err));
    this.totalSum$ = this.shoppingCartService.totalSum$;
    this.totalQuantity$ = this.shoppingCartService.totalQuantity$;
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  onOrder(address: ShippingInfo, products: Product[]) {
    this.ordersService.createOrder(new Order(products, address))
      .pipe(take(1))
      .subscribe(() => {
        alert('Order created!');
        this.shoppingCartService.removeAllProducts();
        this.onShowProducts();
      }, err => console.log(err));
  }

  onIncrease(product: Product): void {
    this.shoppingCartService.increaseQuantity(product);
  }

  onDecrease(product: Product): void {
    this.shoppingCartService.decreaseQuantity(product);
  }

  onRemoveProduct(product: Product): void {
    this.shoppingCartService.removeProduct(product);
  }

  onShowProducts() {
    this.router.navigate(['products-list']);
  }

  onSwitchOrderArgs(newField: OrderType) {
    this.field = newField;
  }

  onSwitchOrderDirection(newDirection: boolean) {
    this.isAsc = newDirection;
  }
}
