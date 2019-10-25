import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCartService } from 'src/app/core/services/shopping-cart.service';
import { Product } from 'src/app/core/models/product';
import { ShippingInfo, OrderType } from 'src/app/core/models/shipping-info';
import { Observable } from 'rxjs';
import { OrdersService } from 'src/app/core/services/orders.service';
import { Order } from 'src/app/core/models/order';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  selectedProducts$: Observable<Product[]>;
  totalSum$: Observable<number>;
  totalQuantity$: Observable<number>;
  shippingInfo: ShippingInfo = new ShippingInfo();
  field: OrderType = OrderType.Quantity;
  isAsc: boolean;

  constructor(private shoppingCartService: ShoppingCartService,
              private ordersService: OrdersService,
              private router: Router) {
  }

  ngOnInit() {
    this.selectedProducts$ = this.shoppingCartService.productsInCart$;
    this.totalSum$ = this.shoppingCartService.totalSum$;
    this.totalQuantity$ = this.shoppingCartService.totalQuantity$;
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
