import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product';

const SHOPPING_CHART_CONTENT = 'shoppingCartContent';

@Injectable()
export class ShoppingCartService {
    private cache: BehaviorSubject<Product[]>;

    getSelectedItems(): BehaviorSubject<Product[]> {
        if (this.cache) {
            return this.cache;
        } else {
            return this.cache = new BehaviorSubject(JSON.parse(localStorage.getItem(SHOPPING_CHART_CONTENT)));
        }
    }

    addProduct(product: Product): void {
        const list = this.getSelectedItems().getValue();
        list.push(product);

        this.updateValues(list);
    }

    removeProduct(product: Product): void {
        const list = this.getSelectedItems().getValue();
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
