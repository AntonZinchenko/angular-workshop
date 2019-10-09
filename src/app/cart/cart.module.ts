import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { GroupByPipe } from './pipes/group-by.pipe';
import { shoppingCartRouterComponents, ShoppingCartRoutingModule } from './shopping-cart.routing.module';
import { CartListComponent, AddressFormComponent, CartListItemComponent } from './pages/shopping-cart/components';
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
    GroupByPipe
  ]
})
export class CartModule { }
