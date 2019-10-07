import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { GroupByPipe } from './pipes/group-by.pipe';
import { shoppingCartRouterComponents, ShoppingCartRoutingModule } from './shopping-cart.routing.module';
import { UserSelectionComponent, AddressFormComponent } from './pages/shopping-cart/components';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    ReactiveFormsModule,
    ShoppingCartRoutingModule,
    SharedModule
  ],
  declarations: [
    shoppingCartRouterComponents,
    UserSelectionComponent,
    AddressFormComponent,
    GroupByPipe
  ]
})
export class CartModule { }
