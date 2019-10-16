import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Product } from '../models/product';
import { map } from 'rxjs/operators';

const SHOPPING_CHART_CONTENT = 'shoppingCartContent';

@Injectable()
export class ShoppingCartService {
    private cache: BehaviorSubject<Product[]>;

    constructor() {
      this.cache = new BehaviorSubject(JSON.parse(localStorage.getItem(SHOPPING_CHART_CONTENT)));
    }

    get productsInCart$(): Observable<Product[]> {
        return this.cache.asObservable();
    }

    get totalPrice$(): Observable<number> {
      return this.productsInCart$.pipe(map(res => {
        let totalPrice = 0;
        // можно попробовать использовать reduce
        res.forEach(i => totalPrice += i.price);
        return totalPrice;
      }));
    }

    get totalQuantity$(): Observable<number> {
      return this.productsInCart$.pipe(map(res => {
        return res.length;
      }));
    }

    addProduct(product: Product): void {
        const list = this.cache.getValue();
        this.updateValues([...list, product]);
    }

    removeProduct(product: Product): void {
        const list = this.cache.getValue();
        const index = list.findIndex(i => i.id === product.id);
        if (index !== -1) {
            this.updateValues(list.filter((v, i) => i !== index));
        }
    }

    clear(): void {
        localStorage.removeItem(SHOPPING_CHART_CONTENT);
        if (this.cache) {
            this.cache.next([]);
        }
    }

    private updateValues(products: Product[]) {
        localStorage.setItem(SHOPPING_CHART_CONTENT, JSON.stringify(products));

        if (this.cache) {
            this.cache.next(products);
        } else {
            this.cache = new BehaviorSubject(undefined);
        }
    }
}
