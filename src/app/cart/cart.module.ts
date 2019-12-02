import { NgModule } from '@angular/core';
import { shoppingCartRouterComponents, ShoppingCartRoutingModule } from './shopping-cart.routing.module';
import { CartListComponent, ProcessOrderComponent, CartListItemComponent, CartListFooterComponent } from './components';
import { SharedModule } from '../shared/shared.module';
import { EmailValidatorDirective } from './components/process-order/validators/email-validation.directive';
import { ValidatorMessageComponent } from './components/validator-message/validator-message.component';

@NgModule({
  imports: [
    ShoppingCartRoutingModule,
    SharedModule
  ],
  declarations: [
    shoppingCartRouterComponents,
    CartListComponent,
    EmailValidatorDirective,
    CartListItemComponent,
    ValidatorMessageComponent,
    ProcessOrderComponent,
    CartListFooterComponent
  ]
})
export class CartModule { }
