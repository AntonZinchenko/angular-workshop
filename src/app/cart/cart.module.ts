import { NgModule } from '@angular/core';
import { shoppingCartRouterComponents, ShoppingCartRoutingModule } from './shopping-cart.routing.module';
import { CartListComponent, AddressFormComponent, CartListItemComponent, CartListFooterComponent } from './components';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    ShoppingCartRoutingModule,
    SharedModule
  ],
  declarations: [
    shoppingCartRouterComponents,
    CartListComponent,
    CartListItemComponent,
    AddressFormComponent,
    CartListFooterComponent
  ]
})
export class CartModule { }
