import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Product } from '../models/product';
import { map } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';

const SHOPPING_CHART_CONTENT = 'shoppingCartContent';

@Injectable()
export class ShoppingCartService {
    private cache: BehaviorSubject<Product[]>;

    constructor(private storage: LocalStorageService) {
      this.updateCartData();
    }

    get productsInCart$(): Observable<Product[]> {
        return this.cache.asObservable();
    }

    get totalSum$(): Observable<number> {
      return this.productsInCart$.pipe(map(res => {
        return res.reduce((sum, current) => sum + current.price, 0);
      }));
    }

    get totalQuantity$(): Observable<number> {
      return this.productsInCart$.pipe(map(res => {
        return res.length;
      }));
    }

    addProduct(product: Product, quantity: number = 1): void {
      for (let i = 0; i < quantity; i++) {
        this.increaseQuantity(product);
      }
    }

    removeProduct(product: Product): void {
      const list = this.cache.getValue();
      this.updateValues(list.filter(i => i.id !== product.id));
    }

    increaseQuantity(product: Product): void {
      const list = this.cache.getValue();
      this.updateValues([...list, product]);
    }

    decreaseQuantity(product: Product): void {
      const list = this.cache.getValue();
      const index = list.findIndex(i => i.id === product.id);
      if (index !== -1) {
          this.updateValues(list.filter((v, i) => i !== index));
      }
    }

    removeAllProducts(): void {
      this.storage.removeItem(SHOPPING_CHART_CONTENT);
      if (this.cache) {
        this.cache.next([]);
      }
    }

    updateCartData(): void {
      this.cache = new BehaviorSubject(JSON.parse(this.storage.getItem(SHOPPING_CHART_CONTENT)) || []);
    }

    private updateValues(products: Product[]) {
      this.storage.setItem(SHOPPING_CHART_CONTENT, JSON.stringify(products));

      if (this.cache) {
        this.cache.next(products);
      } else {
        this.cache = new BehaviorSubject(undefined);
      }
    }
}
