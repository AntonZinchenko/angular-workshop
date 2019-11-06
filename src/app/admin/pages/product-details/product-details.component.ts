import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/core/models/product';
import { Store } from '@ngrx/store';
import { State, selectCurrentProduct } from 'src/app/+store/reducers';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { addProduct, updateProduct } from 'src/app/+store/actions/products.actions';

@Component({
  selector: 'app-admin-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class AdminProductDetailsComponent implements OnInit, OnDestroy {
  product: Product;
  private unsubscribe: Subject<void> = new Subject();

  constructor(private store: Store<State>,
              private router: Router,
              private route: ActivatedRoute) {
    this.product = {} as Product;
  }

  ngOnInit() {
    this.store.select(selectCurrentProduct)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(response => this.product = Object.assign({}, response), err => console.log(err));
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  onSave(model: Product, isValid: boolean): void {
    if (!isValid) {
      return;
    }

    if (!model.id) {
      this.store.dispatch(addProduct({product: model}));
    } else {
      this.store.dispatch(updateProduct({product: model}));
    }
  }

  onGoBack(): void {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }
}
