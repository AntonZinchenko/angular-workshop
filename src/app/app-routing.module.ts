import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AboutComponent } from './pages/about/about.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { ProductsPreloadGuard } from './guards/products-preload.guard';
import { OrdersPreloadGuard } from './guards/orders-preload.guard';

const routes: Routes = [
  {
    path: 'about',
    component: AboutComponent,
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: './products/products.module#ProductsModule',
    canActivate: [ProductsPreloadGuard]
  },
  {
    path: 'cart',
    loadChildren: './cart/cart.module#CartModule',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    canLoad: [AuthGuard],
    loadChildren: './admin/admin.module#AdminModule',
    canActivate: [
      ProductsPreloadGuard,
      OrdersPreloadGuard
    ]
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
