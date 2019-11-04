
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './../guards/auth.guard';
import { AdminComponent } from './admin.component';
import * as page from './pages';

const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    // логичнее в таком порядке canActivate, canActivateChild
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        children: [
          { path: 'products', component: page.AdminProductsComponent },
          { path: 'products/add', component: page.AdminProductDetailsComponent },
          { path: 'products/edit/:id', component: page.AdminProductDetailsComponent },
          { path: 'order/edit/:id', component: page.AdminOrderDetailsComponent },
          { path: '', component: page.AdminOrdersComponent }
        ]
      }
    ]
  }
];
// показывал вам еще вариант использовать статическое свойство текущего класса.
export let adminRouterComponents = [
  AdminComponent,
  page.AdminOrdersComponent,
  page.AdminOrderDetailsComponent,
  page.AdminProductsComponent,
  page.AdminProductDetailsComponent
];
@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ]
})
// Название файла через дефис.
export class AdminRoutingModule { }
