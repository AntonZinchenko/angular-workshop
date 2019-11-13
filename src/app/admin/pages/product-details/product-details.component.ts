import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/core/models/product';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProductsFacadeService } from 'src/app/+store/facades/products-facade.service';

@Component({
  selector: 'app-admin-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class AdminProductDetailsComponent implements OnInit, OnDestroy {
  product: Product;
  private unsubscribe: Subject<void> = new Subject();

  constructor(private products: ProductsFacadeService,
              private router: Router,
              private route: ActivatedRoute) {
    this.product = {} as Product;
  }

  ngOnInit() {
    this.products.getByUrl$
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
      this.products.addProduct(model);
    } else {
      this.products.updateProduct(model);
    }
  }

  onGoBack(): void {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }
}
