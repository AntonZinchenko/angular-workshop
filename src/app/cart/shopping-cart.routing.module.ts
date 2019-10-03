import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';

const cartRoutes: Routes = [
    {
        path: '',
        component: ShoppingCartComponent
    }
];

export let shoppingCartRouterComponents = [
    ShoppingCartComponent
];

@NgModule({
    imports: [
        RouterModule.forChild(cartRoutes)
    ]
})
export class ShoppingCartRoutingModule { }
