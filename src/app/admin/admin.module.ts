import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AdminRoutingModule, adminRouterComponents } from './admin.routing.module';
import { SharedModule } from '../shared/shared.module';
import { AdminProductListItemComponent } from './components/product-list-item/product-list-item.component';
import { AdminOrderListItemComponent } from './components/order-list-item/order-list-item.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    AdminRoutingModule,
    SharedModule
  ],
  declarations: [
    AdminProductListItemComponent,
    AdminOrderListItemComponent,
    adminRouterComponents
  ]
})
export class AdminModule { }
