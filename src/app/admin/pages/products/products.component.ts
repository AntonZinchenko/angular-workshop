import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/core/models/product';
import { ProductsService } from 'src/app/products/services/products.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-admin-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products$: Observable<Product[]>;

  constructor(private productsService: ProductsService,
              private router: Router) { }

  ngOnInit() {
    this.products$ = this.productsService.getProducts();
  }

  onAddNew(): void {
    this.router.navigate(['admin/products/add']);
  }

  onEditItem(product: Product): void {
    this.router.navigate(['admin/products/edit', product.id]);
  }

  onDeleteItem(product: Product): void {
    if (confirm(`Are you sure to delete ${product.title}?`)) {
      this.products$ = this.productsService.deleteProduct(product)
        .pipe(switchMap(() => this.productsService.getProducts()));
    }
  }
}
