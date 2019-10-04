import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/core/models/product';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const PRODUCTS_URL = `http://localhost:3000/products`;

@Injectable()
export class ProductsService {

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(PRODUCTS_URL)
      .pipe(catchError(this.handleError<Product[]>('getProducts', [])));
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${PRODUCTS_URL}/${id}`)
    .pipe(catchError(this.handleError<Product>('getProduct', null)));
  }

  createProduct(product: Product): Observable<Product> {
    const body = JSON.stringify(product);
    return this.http.post<Product>(PRODUCTS_URL, body)
    .pipe(catchError(this.handleError<Product>('createProduct', null)));
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${PRODUCTS_URL}/${product.id}`, JSON.stringify(product))
    .pipe(catchError(this.handleError<Product>('updateProduct', null)));
  }

  deleteProduct(product: Product): Observable<Product> {
    return this.http.delete<Product>(`${PRODUCTS_URL}/${product.id}`)
    .pipe(catchError(this.handleError<Product>('deleteProduct', null)));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.error(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
