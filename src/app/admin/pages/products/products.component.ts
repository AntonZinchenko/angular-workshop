import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/core/models/product';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State, getProducts } from 'src/app/reducers';
import { deleteProduct } from 'src/app/actions/products.actions';

@Component({
  selector: 'app-admin-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products$: Observable<Product[]>;

  constructor(private store: Store<State>,
              private router: Router) { }

  ngOnInit() {
    this.products$ = this.store.select(getProducts);
  }

  onAddNew(): void {
    this.router.navigate(['admin/products/add']);
  }

  onEditItem(product: Product): void {
    this.router.navigate(['admin/products/edit', product.id]);
  }

  onDeleteItem(product: Product): void {
    if (confirm(`Are you sure to delete ${product.title}?`)) {
      this.store.dispatch(deleteProduct(({product})));
    }
  }
}
