import { Router } from '@angular/router';
import { ShoppingCartService } from 'src/app/core/services/shopping-cart.service';
import { Product } from 'src/app/core/models/product';

export class BaseListComponent {
    product: Product;

    constructor(protected router: Router, protected shoppingCartService: ShoppingCartService) { }

    onBuy(): void {
        if (this.product) {
            this.shoppingCartService.addProduct(this.product);
        }
    }
}
