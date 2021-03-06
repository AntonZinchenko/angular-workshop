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
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AboutComponent } from './pages/about/about.component';
import { ClickDirective } from './shared/directives/click.directive';
import { LocalStorageService } from './core/services/local-storage.service';
import { OrdersService } from './core/services/orders.service';
import { AuthService } from './core/services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './+store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { ProductsEffects } from './+store/products/effects';
import { OrdersEffects } from './+store/orders/effects';
import { ProductsPreloadGuard } from './guards/products-preload.guard';
import { OrdersPreloadGuard } from './guards/orders-preload.guard';
import { TimingInterceptor } from './core/interceptors/timing.interceptor';
import { AppSettings } from './core/services/app-settings.service';
import { CartFacadeService } from './+store/cart/facade';
import { ProductsFacadeService } from './+store/products/facade';
import { OrdersFacadeService } from './+store/orders/facade';
import { RouterEffects } from './+store/router/effects';
import { RouterStateSerializerProvider } from './+store/router/reducer';

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
      OrdersEffects,
      RouterEffects
    ]),
    StoreRouterConnectingModule.forRoot({stateKey: 'router'}),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [
  //  RouterStateSerializerProvider,
    LocalStorageService,
    AppSettings,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TimingInterceptor,
      multi: true
    },
    ShoppingCartService,
    OrdersService,
    AuthService,
    AuthGuard,
    ProductsPreloadGuard,
    OrdersPreloadGuard,
    CartFacadeService,
    ProductsFacadeService,
    OrdersFacadeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

