import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCartService } from 'src/app/core/services/shopping-cart.service';
import { Product } from 'src/app/core/models/product';
import { ShippingInfo } from 'src/app/core/models/shipping-info';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  selectedProducts: Product[];
  shippingInfo: ShippingInfo;

  constructor(private shoppingCartService: ShoppingCartService, private router: Router) {
    this.shippingInfo = new ShippingInfo();
  }

  ngOnInit() {
    this.refreshCartData();
  }

  removeProduct(product: Product): void {
    this.shoppingCartService.removeProduct(product);
    this.refreshCartData();
  }

  showProducts() {
    this.router.navigate(['products']);
  }

  createOrder(model: ShippingInfo, isValid: boolean) {
    console.log('create order');
  }

  get totalPrice() {
    let totalPrice = 0;
    if (this.selectedProducts) {
      this.selectedProducts.forEach(i => totalPrice += i.price);
    }

    return totalPrice;
  }

  private refreshCartData() {
    this.selectedProducts = this.shoppingCartService.getSelectedItems();
  }
}
