import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProductComponent } from './pages';
import { ProductsRoutingModule, productsRouterComponents } from './products.routing.module';
import { ToStarsPipe } from './pipes/stars.pipe';
import { ProductsService } from './services/products.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ProductsRoutingModule
  ],
  declarations: [
    productsRouterComponents,
    ProductComponent,
    ToStarsPipe
  ],
  providers: [ProductsService],
})
export class ProductsModule { }
