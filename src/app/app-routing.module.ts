import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AboutComponent } from './pages/about/about.component';

const routes: Routes = [
  {
    path: 'about',
    component: AboutComponent,
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: './products/products.module#ProductsModule'
  },
  {
    path: 'cart',
    loadChildren: './cart/cart.module#CartModule',
    pathMatch: 'full'
  },
  {
      path: '**',
      component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
