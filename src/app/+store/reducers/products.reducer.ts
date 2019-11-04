import { createReducer, Action, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as productActions from '../actions/products.actions';
import { Product } from '../../core/models/product';

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>();

export interface ProductsState extends EntityState<Product> {
  error: string;
}

const productsReducer = createReducer(
  adapter.getInitialState({error: ''}),
  on(productActions.productsLoaded, (state, {products}) => adapter.addAll(products, { ...state, error: '' })),
  on(productActions.productAdded, (state, {product}) => adapter.addOne(product, { ...state, error: '' })),
  on(productActions.productUpdated, (state, {product}) => adapter.upsertOne(product, { ...state, error: '' })),
  on(productActions.productDeleted, (state, {product}) => adapter.removeOne(product.id, { ...state, error: '' })),
  on(
    productActions.productsLoadFailed,
    productActions.productDeleteFailed,
    (state, {error}) => adapter.removeAll({ ...state, error }))
);

export function reducer(state: ProductsState | undefined, action: Action) {
  return productsReducer(state, action);
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
