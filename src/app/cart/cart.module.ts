import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GroupByPipe } from './pipes/group-by.pipe';
import { shoppingCartRouterComponents, ShoppingCartRoutingModule } from './shopping-cart.routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ShoppingCartRoutingModule
  ],
  declarations: [
    shoppingCartRouterComponents,
    GroupByPipe
  ]
})
export class CartModule { }
