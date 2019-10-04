import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GroupByPipe } from './pipes/group-by.pipe';
import { shoppingCartRouterComponents, ShoppingCartRoutingModule } from './shopping-cart.routing.module';
import { UserSelectionComponent, AddressFormComponent } from './pages/shopping-cart/components';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ShoppingCartRoutingModule
  ],
  declarations: [
    shoppingCartRouterComponents,
    UserSelectionComponent,
    AddressFormComponent,
    GroupByPipe
  ]
})
export class CartModule { }
