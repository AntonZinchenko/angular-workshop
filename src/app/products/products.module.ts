import { NgModule } from '@angular/core';
import { ProductsRoutingModule, productsRouterComponents } from './products.routing.module';
import { ToStarsPipe } from './pipes/stars.pipe';
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
    ProductComponent,
    ToStarsPipe
  ],
  providers: [ProductsService]
})
export class ProductsModule { }
