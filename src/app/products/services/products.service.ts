import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/core/models/product';

const PRODUCTS_URL = `http://localhost:3000/products`;

@Injectable()
export class ProductsService {

  constructor(private http: HttpClient) {
  }

  getProducts(): Promise<Product[]> {
    return this.http.get<Product[]>(PRODUCTS_URL)
      .toPromise()
      .catch(this.handleError);
  }

  getProduct(id: number): Promise<Product> {
    return this.http.get<Product>(`${PRODUCTS_URL}/${id}`)
      .toPromise()
      .catch(this.handleError);
  }

  createProduct(product: Product): Promise<Product> {
    const body = JSON.stringify(product);
    return this.http.post<Product>(PRODUCTS_URL, body)
      .toPromise()
      .catch(this.handleError);
  }

  updateProduct(product: Product): Promise<Product> {
    return this.http.put<Product>(`${PRODUCTS_URL}/${product.id}`, JSON.stringify(product))
      .toPromise()
      .catch(this.handleError);
  }

  deleteProduct(product: Product): Promise<Product> {
    return this.http.delete<Product>(`${PRODUCTS_URL}/${product.id}`)
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
