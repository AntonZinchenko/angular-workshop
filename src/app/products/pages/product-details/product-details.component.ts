import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { ShoppingCartService } from 'src/app/core/services/shopping-cart.service';
import { Subscription, Observable } from 'rxjs';
import { Product } from 'src/app/core/models/product';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product$: Observable<Product>;
  private subs: Subscription[] = [];

  constructor(private router: Router,
              private shoppingCartService: ShoppingCartService,
              private route: ActivatedRoute,
              private productsService: ProductsService) {
  }

  ngOnInit() {
    this.product$ = this.route.paramMap.pipe(
      switchMap(params => this.productsService.getProduct(+params.get('id'))));
  }

  onBuy(product: Product): void {
    if (product) {
      this.shoppingCartService.addProduct(product);
    }
  }

  onShowProducts() {
    this.router.navigate(['products']);
  }
}
