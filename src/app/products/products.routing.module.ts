import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDetailsComponent, ProductListComponent } from './pages';

const productsRoutes: Routes = [
    {
        path: '',
        redirectTo: 'products-list',
        pathMatch: 'full'
    },
    {
        path: 'products-list',
        component: ProductListComponent
    },
    {
        path: 'product/:id',
        component: ProductDetailsComponent
    }
];

export let productsRouterComponents = [
    ProductDetailsComponent,
    ProductListComponent
];

@NgModule({
    imports: [RouterModule.forChild(productsRoutes)],
    exports: [RouterModule]
})
export class ProductsRoutingModule { }
