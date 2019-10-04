import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCartService } from 'src/app/core/services/shopping-cart.service';
import { Product } from 'src/app/core/models/product';
import { ShippingInfo } from 'src/app/core/models/shipping-info';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html'
})
export class ShoppingCartComponent implements OnInit {

  selectedProducts: Product[];
  shippingInfo: ShippingInfo = new ShippingInfo();

  constructor(private shoppingCartService: ShoppingCartService, private router: Router) {
  }

  ngOnInit() {
    this.refreshCartData();
  }

  onOrder(address: ShippingInfo) {
    console.log('create order');
  }

  onDeleteProduct(product: Product): void {
    this.shoppingCartService.removeProduct(product);
    this.refreshCartData();
  }

  showProducts() {
    this.router.navigate(['products']);
  }

  private refreshCartData() {
    this.selectedProducts = this.shoppingCartService.getSelectedItems();
  }
}
