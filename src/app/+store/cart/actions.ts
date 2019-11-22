import { createAction, props } from '@ngrx/store';
import { Product } from '../../core/models/product';

export const addProduct = createAction('[Cart] Add Product', props<{product: Product}>());
export const removeProduct = createAction('[Cart] Remove Product', props<{product: Product}>());
export const increaseQuantity = createAction('[Cart] Increase Product Quantity', props<{product: Product}>());
export const decreaseQuantity = createAction('[Cart] Decrease Product Quantity', props<{product: Product}>());
export const clearCart = createAction('[Cart] Clear selected products');
