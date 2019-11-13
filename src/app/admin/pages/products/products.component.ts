import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/core/models/product';
import { Observable } from 'rxjs';
import { ProductsFacadeService } from 'src/app/+store/facades/products-facade.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products$: Observable<Product[]>;

  constructor(private products: ProductsFacadeService,
              private router: Router) { }

  ngOnInit() {
    this.products$ = this.products.all$;
  }

  onAddNew(): void {
    this.router.navigate(['admin/products/add']);
  }

  onEditItem(product: Product): void {
    this.router.navigate(['admin/products/edit', product.id]);
  }

  onDeleteItem(product: Product): void {
    if (confirm(`Are you sure to delete ${product.title}?`)) {
      this.products.deleteProduct(product);
    }
  }
}
