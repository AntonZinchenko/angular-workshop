import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCartService } from 'src/app/core/services/shopping-cart.service';
import { Product } from 'src/app/core/models/product';
import { ShippingInfo } from 'src/app/core/models/shipping-info';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html'
})
export class ShoppingCartComponent implements OnInit {

  selectedProducts$: Observable<Product[]>;
  shippingInfo: ShippingInfo = new ShippingInfo();

  constructor(private shoppingCartService: ShoppingCartService,
              private router: Router) {
  }

  ngOnInit() {
    this.selectedProducts$ = this.shoppingCartService.getSelectedItems().asObservable();
  }

  onOrder(address: ShippingInfo) {
    console.log('order created');
  }

  onDeleteProduct(product: Product): void {
    this.shoppingCartService.removeProduct(product);
  }

  onShowProducts() {
    this.router.navigate(['products']);
  }
}
