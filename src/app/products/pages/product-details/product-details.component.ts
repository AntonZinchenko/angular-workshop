import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BaseListComponent } from '../base-product.component';
import { ProductsService } from '../../services/products.service';
import { ShoppingCartService } from 'src/app/core/services/shopping-cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent extends BaseListComponent implements OnInit {

  constructor(protected router: Router,
              protected shoppingCartService: ShoppingCartService,
              private route: ActivatedRoute,
              private productsService: ProductsService) {
    super(router, shoppingCartService);
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.productsService.getProduct(+params.get('id'))
        .then(product => this.product = Object.assign({}, product))
        .catch(err => console.log(err));
    });
  }

  showProducts() {
    this.router.navigate(['products']);
  }
}
