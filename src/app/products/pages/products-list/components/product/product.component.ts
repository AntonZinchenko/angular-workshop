import { Component, Input, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseListComponent } from '../../../base-product.component';
import { ProductsService } from '../../../../services/products.service';
import { Product } from 'src/app/core/models/product';
import { ShoppingCartService } from 'src/app/core/services/shopping-cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent extends BaseListComponent implements OnInit {
  @Input() data: Product;

  constructor(protected productsService: ProductsService, protected router: Router, protected shoppingCartService: ShoppingCartService) {
    super(router, shoppingCartService);
  }

  ngOnInit(): void {
    this.product = this.data;
  }

  showDetails() {
    this.router.navigate(['product', this.product.id]);
  }
}
