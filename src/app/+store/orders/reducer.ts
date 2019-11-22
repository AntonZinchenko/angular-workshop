import { createReducer, Action, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as orderActions from './actions';
import { Order } from '../../core/models/order';

export const adapter: EntityAdapter<Order> = createEntityAdapter<Order>();

export interface OrdersState extends EntityState<Order> {
  error: string;
}

const ordersReducer = createReducer(
  adapter.getInitialState({error: ''}),
  on(orderActions.ordersLoaded, (state, {orders}) => adapter.addAll(orders, { ...state, error: '' })),
  on(orderActions.orderAdded, (state, {order}) => adapter.addOne(order, { ...state, error: '' })),
  on(orderActions.orderUpdated, (state, {order}) => adapter.upsertOne(order, { ...state, error: '' })),
  on(orderActions.orderDeleted, (state, {order}) => adapter.removeOne(order.id, { ...state, error: '' })),
  on(
    orderActions.ordersLoadFailed,
    orderActions.orderDeleteFailed,
    (state, {error}) => adapter.removeAll({ ...state, error }))
);

export function reducer(state: OrdersState | undefined, action: Action) {
  return ordersReducer(state, action);
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
