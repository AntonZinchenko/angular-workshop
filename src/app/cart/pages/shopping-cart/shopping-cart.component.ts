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
  totalPrice$: Observable<number>;
  totalQuantity$: Observable<number>;
  shippingInfo: ShippingInfo = new ShippingInfo();

  constructor(private shoppingCartService: ShoppingCartService,
              private router: Router) {
  }

  ngOnInit() {
    this.selectedProducts$ = this.shoppingCartService.productsInCart$;
    this.totalPrice$ = this.shoppingCartService.totalPrice$;
    this.totalQuantity$ = this.shoppingCartService.totalQuantity$;
  }

  onOrder(address: ShippingInfo) {
    console.log('order created');
  }

  onAddProduct(product: Product): void {
    this.shoppingCartService.addProduct(product);
  }

  onDeleteProduct(product: Product): void {
    this.shoppingCartService.removeProduct(product);
  }

  onShowProducts() {
    this.router.navigate(['products']);
  }
}
