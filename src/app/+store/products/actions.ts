import { createAction, props } from '@ngrx/store';
import { Product } from '../../core/models/product';

export const loadProducts = createAction('[Products] Load products');
export const productsLoaded = createAction('[Products] Products loaded', props<{products: Product[]}>());
export const productsLoadFailed = createAction('[Products] Products load failed', props<{error: string}>());
export const addProduct = createAction('[Products] Add product', props<{product: Product}>());
export const productAdded = createAction('[Products] Product added', props<{product: Product}>());
export const productAddFailed = createAction('[Products] Product add failed', props<{error: string}>());
export const updateProduct = createAction('[Products] Update product', props<{product: Product}>());
export const productUpdated = createAction('[Products] Product updated', props<{product: Product}>());
export const productUpdateFailed = createAction('[Products] Product update failed', props<{error: string}>());
export const deleteProduct = createAction('[Products] Delete product', props<{product: Product}>());
export const productDeleted = createAction('[Products] Product deleted', props<{product: Product}>());
export const productDeleteFailed = createAction('[Products] Product delete failed', props<{error: string}>());
