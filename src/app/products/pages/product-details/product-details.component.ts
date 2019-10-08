import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { ShoppingCartService } from 'src/app/core/services/shopping-cart.service';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/core/models/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  product: Product;
  private subs: Subscription[] = []; // Subscription имеет возможность создать дочерниеподписки с помощью
  // add метода и когда отписываешься от основной, то от дочерней тоже произойдет отписка

  constructor(private router: Router,
              private shoppingCartService: ShoppingCartService,
              private route: ActivatedRoute,
              private productsService: ProductsService) {
  }

  ngOnInit() {
    // антипатерн subscribe in subscribe
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

  onBuy(): void {
    if (this.product) {
      this.shoppingCartService.addProduct(this.product);
    }
  }

  onShowProducts() {
    this.router.navigate(['products']);
  }
}
