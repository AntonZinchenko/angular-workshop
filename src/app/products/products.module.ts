import { NgModule } from '@angular/core';
import { ProductsRoutingModule, productsRouterComponents } from './products.routing.module';
import { ProductsService } from './services/products.service';
import { SharedModule } from '../shared/shared.module';
import { ProductComponent } from './components/product/product.component';

@NgModule({
  imports: [
    SharedModule,
    ProductsRoutingModule
  ],
  declarations: [
    productsRouterComponents,
    ProductComponent
  ],
  providers: [
    ProductsService
  ]
})
export class ProductsModule { }
