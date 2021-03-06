import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import * as actions from './actions';
import { ProductsService } from '../../products/services/products.service';
import { go } from '../router/actions';

@Injectable()
export class ProductsEffects {
  constructor(
    private actions$: Actions,
    private productsService: ProductsService
  ) { }

  loadProducts$ = createEffect(() => this.actions$.pipe(
    ofType(actions.loadProducts),
    mergeMap(() => this.productsService.getProducts()
      .pipe(
        map(products => actions.productsLoaded({ products })),
        catchError((error) => of(actions.productsLoadFailed({ error })))
      ))
  ));

  createProduct$ = createEffect(() => this.actions$.pipe(
    ofType(actions.addProduct),
    mergeMap(arg => this.productsService.createProduct(arg.product)
      .pipe(
        map(product => actions.productAdded({ product })),
        catchError((error) => of(actions.productAddFailed({ error })))
      ))
  ));

  updateProduct$ = createEffect(() => this.actions$.pipe(
    ofType(actions.updateProduct),
    mergeMap(arg => this.productsService.updateProduct(arg.product)
      .pipe(
        map(product => actions.productUpdated({ product })),
        catchError((error) => of(actions.productUpdateFailed({ error })))
      ))
  ));

  operationSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(actions.productAdded, actions.updateProduct),
    map(() => go({ path: ['admin/products'] })))
  );

  deleteProduct$ = createEffect(() => this.actions$.pipe(
    ofType(actions.deleteProduct),
    mergeMap(arg => this.productsService.deleteProduct(arg.product)
      .pipe(
        map(() => actions.productDeleted({ product: arg.product })),
        catchError((error) => of(actions.productDeleteFailed({ error })))
      ))
  ));
}
