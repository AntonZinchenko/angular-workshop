import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDetailsComponent, ProductsListComponent } from './pages';

const productsRoutes: Routes = [
    {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full'
    },
    {
        path: 'products',
        component: ProductsListComponent,
    },
    {
        path: 'product/:id',
        component: ProductDetailsComponent
    }
];

export let productsRouterComponents = [
    ProductDetailsComponent,
    ProductsListComponent
];

@NgModule({
    imports: [RouterModule.forChild(productsRoutes)],
    exports: [RouterModule]
})
export class ProductsRoutingModule { }
