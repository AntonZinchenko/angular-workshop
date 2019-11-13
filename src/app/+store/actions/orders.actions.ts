import { createAction, props } from '@ngrx/store';
import { Order } from '../../core/models/order';

export const loadOrders = createAction('[Orders] Load orders');
export const ordersLoaded = createAction('[Orders] Orders loaded', props<{orders: Order[]}>());
export const ordersLoadFailed = createAction('[Orders] Orders load failed', props<{error: string}>());
export const addOrder = createAction('[Orders] Add order', props<{order: Order}>());
export const orderAdded = createAction('[Orders] Order added', props<{order: Order}>());
export const orderAddFailed = createAction('[Orders] Order add failed', props<{error: string}>());
export const updateOrder = createAction('[Orders] Update order', props<{order: Order}>());
export const orderUpdated = createAction('[Orders] Order updated', props<{order: Order}>());
export const orderUpdateFailed = createAction('[Orders] Order update failed', props<{error: string}>());
export const deleteOrder = createAction('[Orders] Delete order', props<{order: Order}>());
export const orderDeleted = createAction('[Orders] Order deleted', props<{order: Order}>());
export const orderDeleteFailed = createAction('[Orders] Order delete failed', props<{error: string}>());
