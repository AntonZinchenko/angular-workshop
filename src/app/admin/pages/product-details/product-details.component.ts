import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from 'src/app/core/models/product';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProductsFacadeService } from 'src/app/+store/products/facade';

@Component({
  selector: 'app-admin-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class AdminProductDetailsComponent implements OnInit, OnDestroy {
  product: Product;
  private unsubscribe: Subject<void> = new Subject();

  constructor(private productsFacade: ProductsFacadeService) {
    this.product = {} as Product;
  }

  ngOnInit() {
    this.productsFacade.getProductByUrl()
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
      this.productsFacade.addProduct(model);
    } else {
      this.productsFacade.updateProduct(model);
    }
  }

  onGoBack(): void {
    this.productsFacade.cancelEditMode();
  }
}
