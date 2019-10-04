import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BaseListComponent } from '../base-product.component';
import { ProductsService } from '../../services/products.service';
import { ShoppingCartService } from 'src/app/core/services/shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent extends BaseListComponent implements OnInit, OnDestroy {
  private subs: Subscription[] = [];

  constructor(protected router: Router,
              protected shoppingCartService: ShoppingCartService,
              private route: ActivatedRoute,
              private productsService: ProductsService) {
    super(router, shoppingCartService);
  }

  ngOnInit() {
    this.subs.push(this.route.paramMap.subscribe(params => {
      this.subs.push(this.productsService.getProduct(+params.get('id'))
        .subscribe(data => {
          this.product = data;
        }));
    }));
  }

  ngOnDestroy(): void {
    if (this.subs.length) {
      this.subs.forEach(sub => sub.unsubscribe());
    }
  }

  showProducts() {
    this.router.navigate(['products']);
  }
}
