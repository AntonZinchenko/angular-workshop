import { createReducer, Action, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as cartActions from './actions';
import { Product } from '../../core/models/product';

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>({
  selectId: product => `${product.id}-${new Date().getTime()}`
});

export interface CartState extends EntityState<Product> {}

const cartReducer = createReducer(
  adapter.getInitialState({}),
  on(cartActions.clearCart, state => adapter.removeAll(state)),
  on(cartActions.addProduct, (state, {product}) => adapter.addOne(product, state)),
  on(cartActions.removeProduct, (state, {product}) => adapter.removeMany(groupProductIds(state, product.id), state)),
  on(cartActions.increaseQuantity, (state, {product}) => adapter.addOne(product, state)),
  on(cartActions.decreaseQuantity, (state, {product}) => {
    const groupIds = groupProductIds(state, product.id);
    return (groupIds.length) ? adapter.removeOne(groupIds[0], state) : {...state};
  })
);

export function reducer(state: CartState | undefined, action: Action) {
  return cartReducer(state, action);
}

function groupProductIds(state: CartState, groupId: number) {
  const allIds = (state.ids as string[]);
  return allIds.filter(id => id.startsWith(`${groupId}-`));
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
