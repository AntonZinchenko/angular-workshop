import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/core/models/product';
import { ProductsService } from 'src/app/products/services/products.service';
import { Subscription } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'app-admin-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class AdminProductDetailsComponent implements OnInit {
  product: Product;
  private subscriptions: Subscription = new Subscription();

  constructor(private productsService: ProductsService,
              private router: Router,
              private route: ActivatedRoute) {
    this.product = {} as Product;
  }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => this.productsService.getProduct(+params.get('id'))))
        .subscribe(response => this.product = response, err => console.log(err));
  }

  onSave(model: Product, isValid: boolean): void {
    if (!isValid) {
      return;
    }

    const actionResult = (!model.id)
      ? this.productsService.createProduct(model)
      : this.productsService.updateProduct(model);

    actionResult.pipe(take(1))
      .subscribe(() => this.onGoBack(), err => console.log(err));
  }

  onGoBack(): void {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }
}
