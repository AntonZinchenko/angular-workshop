import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from 'src/app/core/models/product';
import { ShippingInfo, OrderType } from 'src/app/core/models/shipping-info';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CartFacadeService } from 'src/app/+store/facades/cart-facade.service';
import { OrdersFacadeService } from 'src/app/+store/facades/orders-facade.service';
import { Order } from 'src/app/core/models/order';
import { ProductsFacadeService } from 'src/app/+store/facades/products-facade.service';

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

  constructor(private cartFacade: CartFacadeService,
              private ordersFacade: OrdersFacadeService,
              private productsFacade: ProductsFacadeService) {
  }

  ngOnInit() {
    this.cartFacade.selectedProducts$
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(response => this.products = response, err => console.log(err));
    this.totalSum$ = this.cartFacade.totalSum$;
    this.totalQuantity$ = this.cartFacade.totalQuantity$;
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  onOrder(address: ShippingInfo, products: Product[]) {
    this.ordersFacade.createOrder(new Order(products, address));
  }

  onIncrease(product: Product): void {
    this.cartFacade.increaseQuantity(product);
  }

  onDecrease(product: Product): void {
    this.cartFacade.decreaseQuantity(product);
  }

  onRemoveProduct(product: Product): void {
    this.cartFacade.removeProduct(product);
  }

  onShowProducts() {
    this.productsFacade.showProductsList();
  }

  onSwitchOrderArgs(newField: OrderType) {
    this.field = newField;
  }

  onSwitchOrderDirection(newDirection: boolean) {
    this.isAsc = newDirection;
  }
}
