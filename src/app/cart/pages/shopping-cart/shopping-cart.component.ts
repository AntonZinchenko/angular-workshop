import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCartService } from 'src/app/core/services/shopping-cart.service';
import { Product } from 'src/app/core/models/product';
import { ShippingInfo } from 'src/app/core/models/shipping-info';
import { Observable } from 'rxjs';

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

  constructor(private shoppingCartService: ShoppingCartService,
              private router: Router) {
  }

  ngOnInit() {
    this.selectedProducts$ = this.shoppingCartService.productsInCart$;
    this.totalSum$ = this.shoppingCartService.totalSum$;
    this.totalQuantity$ = this.shoppingCartService.totalQuantity$;
  }

  onOrder(address: ShippingInfo) {
    console.log('order created');
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
    this.router.navigate(['products']);
  }
}
