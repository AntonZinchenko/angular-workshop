import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Order } from '../models/order';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap, catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class OrdersService {
  private backendUrl = `${environment.backend}/orders`;

  constructor(private http: HttpClient) {
  }

 getOrders(): Observable<Order[]> {
  return this.http.get<Order[]>(this.backendUrl)
    .pipe(
      tap(orders => console.log(`fetched ${orders.length} orders`)),
      catchError(this.handleError('getOrders', []))
    );
  }

  getOrder(id: number): Observable<Order> {
    const url = `${this.backendUrl}/${id}`;
    return this.http.get<Order>(url).pipe(
      tap(_ => console.log(`fetched order id=${id}`)),
      catchError(this.handleError<Order>(`getOrder id=${id}`))
    );
  }

  createOrder(newOrder: Order): Observable<Order> {
    return this.http.post<Order>(this.backendUrl, newOrder, httpOptions).pipe(
      tap((order: Order) => console.log(`added order w/ id=${order.id}`)),
      catchError(this.handleError<Order>('addOrder'))
    );
  }

  updateOrder(order: Order): Observable<Order> {
    const url = `${this.backendUrl}/${order.id}`;

    return this.http.put<Order>(url, order, httpOptions).pipe(
      tap(_ => console.log(`updated order id=${order.id}`)),
      catchError(this.handleError<any>('updateOrder'))
    );
  }

  deleteOrder(order: Order | number): Observable<Order> {
    const id = typeof order === 'number' ? order : order.id;
    const url = `${this.backendUrl}/${id}`;

    return this.http.delete<Order>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted order id=${id}`)),
      catchError(this.handleError<Order>('deleteOrder'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);
      console.log(`${operation} failed: ${error.message}`);

      return throwError(`${operation} failed: ${error.message}`);
    };
  }
}
