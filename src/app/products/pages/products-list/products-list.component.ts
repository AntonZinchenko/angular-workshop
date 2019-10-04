import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from 'src/app/core/models/product';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html'
})
export class ProductsListComponent implements OnInit {
  products$: Observable<Product[]>;

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.products$ = this.productsService.getProducts();
  }
}
