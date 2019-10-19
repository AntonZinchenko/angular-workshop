import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { shoppingCartRouterComponents, ShoppingCartRoutingModule } from './shopping-cart.routing.module';
import { CartListComponent, AddressFormComponent, CartListItemComponent, CartListFooterComponent } from './pages/shopping-cart/components';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    ReactiveFormsModule,
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
