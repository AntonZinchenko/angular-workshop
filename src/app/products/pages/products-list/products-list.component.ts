import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from 'src/app/core/models/product';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html'
})
export class ProductsListComponent implements OnInit {
  products: Product[];

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.productsService.getProducts()
      .then(products => this.products = products)
      .catch(err => console.log(err));
  }
}
