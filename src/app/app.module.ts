import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartModule } from './cart/cart.module';
import { ProductsModule } from './products/products.module';
import { ShoppingCartService } from './core/services/shopping-cart.service';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AboutComponent } from './pages/about/about.component';
import { ClickDirective } from './shared/directives/click.directive';
import { LocalStorageService } from './core/services/local-storage.service';
import { OrdersService } from './core/services/orders.service';
import { AuthService } from './core/services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './+store/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { ProductsEffects } from './+store/effects/products.effects';
import { ProductsService } from './products/services/products.service';
import { OrdersEffects } from './+store/effects/orders.effects';
import { ProductsPreloadGuard } from './guards/products-preload.guard';
import { OrdersPreloadGuard } from './guards/orders-preload.guard';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LoginComponent,
    AboutComponent,
    ClickDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AppRoutingModule,
    CartModule,
    ProductsModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      }
    }),
    EffectsModule.forRoot([
      ProductsEffects,
      OrdersEffects
    ]),
    StoreRouterConnectingModule.forRoot({stateKey: 'router'}),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [
    LocalStorageService,
    ShoppingCartService,
    ProductsService, // удалить!!!
    OrdersService,
    AuthService,
    AuthGuard,
    ProductsPreloadGuard,
    OrdersPreloadGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

