import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/core/models/product';
import { ShippingInfo, OrderType } from 'src/app/core/models/shipping-info';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CartFacadeService } from 'src/app/+store/facades/cart-facade.service';
import { OrdersFacadeService } from 'src/app/+store/facades/orders-facade.service';
import { Order } from 'src/app/core/models/order';

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

  constructor(private cart: CartFacadeService,
              private orders: OrdersFacadeService,
              private router: Router) {
  }

  ngOnInit() {
    this.cart.selectedProducts$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(response => this.products = response, err => console.log(err));
    this.totalSum$ = this.cart.totalSum$;
    this.totalQuantity$ = this.cart.totalQuantity$;
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  onOrder(address: ShippingInfo, products: Product[]) {
    this.orders.createOrder(new Order(products, address));
  }

  onIncrease(product: Product): void {
    this.cart.increaseQuantity(product);
  }

  onDecrease(product: Product): void {
    this.cart.decreaseQuantity(product);
  }

  onRemoveProduct(product: Product): void {
    this.cart.removeProduct(product);
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
