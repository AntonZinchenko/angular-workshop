import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/core/models/product';
import { Observable } from 'rxjs';
import { ProductsFacadeService } from 'src/app/+store/products/facade';

@Component({
  selector: 'app-admin-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products$: Observable<Product[]>;

  constructor(private productsFacade: ProductsFacadeService) { }

  ngOnInit() {
    this.products$ = this.productsFacade.getAllProducts();
  }

  onAddNew(): void {
    this.productsFacade.showFormProduct();
  }

  onEditItem(product: Product): void {
    this.productsFacade.showFormProduct(product.id);
  }

  onDeleteItem(product: Product): void {
    if (confirm(`Are you sure to delete ${product.title}?`)) {
      this.productsFacade.deleteProduct(product);
    }
  }
}
