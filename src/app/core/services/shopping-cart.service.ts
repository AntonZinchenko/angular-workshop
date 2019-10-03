import { Injectable } from '@angular/core';
import { Product } from '../models/product';

const SHOPPING_CHART_CONTENT = 'shoppingCartContent';

@Injectable()
export class ShoppingCartService {

    addProduct(product: Product): void {
        const list = this.getSelectedItems();
        list.push(product);
        localStorage.setItem(SHOPPING_CHART_CONTENT, JSON.stringify(list));
    }

    removeProduct(product: Product): void {
        const list = this.getSelectedItems();
        const index = list.findIndex(i => i.id === product.id);
        if (index !== -1) {
            localStorage.setItem(SHOPPING_CHART_CONTENT,
                JSON.stringify(list.filter((v, i) => i !== index)));
        }
    }

    clear(): void {
        localStorage.removeItem(SHOPPING_CHART_CONTENT);
    }

    getSelectedItems(): Product[] {
        return JSON.parse(localStorage.getItem(SHOPPING_CHART_CONTENT)) as Product[] || [];
    }
}
