import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/core/models/product';
import { State, getProductByUrl } from 'src/app/+store/reducers';
import { Store } from '@ngrx/store';
import { addProduct } from 'src/app/+store/actions/cart.actions';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product$: Observable<Product>;

  constructor(private router: Router,
              private store: Store<State>) {
  }

  ngOnInit() {
    this.product$ = this.store.select(getProductByUrl);
  }

  onBuy(product: Product): void {
    if (product) {
      this.store.dispatch(addProduct({product}));
    }
  }

  onShowProducts() {
    this.router.navigate(['products-list']);
  }
}
