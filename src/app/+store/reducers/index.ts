import {
  ActionReducerMap,
  createSelector,
  MetaReducer,
  createFeatureSelector
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromCart from './cart.reducer';
import * as fromProducts from './products.reducer';
import * as fromOrders from './orders.reducer';
import { RouterReducerState, routerReducer } from '@ngrx/router-store';

export interface State {
  cart: fromCart.CartState;
  products: fromProducts.ProductsState;
  orders: fromOrders.OrdersState;
  router: RouterReducerState;
}

export const reducers: ActionReducerMap<State> = {
  cart: fromCart.reducer,
  products: fromProducts.reducer,
  orders: fromOrders.reducer,
  router: routerReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export const selectRouterState = createFeatureSelector<RouterReducerState>('router');
export const selectRouteParameters = createSelector(selectRouterState,
  router => {
    let routeLevel = router.state.root.firstChild;
    while (routeLevel.firstChild) {
      routeLevel = routeLevel.firstChild;
    }
    return routeLevel.params;
  }
);

export const getCartState = createFeatureSelector<fromCart.CartState>('cart');
export const getCartProducts = createSelector(getCartState, fromCart.selectAll);
export const getCartTotalQuantity = createSelector(getCartState, fromCart.selectTotal);
export const getCartTotalSum = createSelector(getCartProducts,
  (selectedProducts) => selectedProducts.reduce((sum, current) => sum + current.price, 0));

export const getProductsState = createFeatureSelector<fromProducts.ProductsState>('products');
export const getProducts = createSelector(getProductsState, fromProducts.selectAll);

export const selectCurrentProduct = createSelector(
  getProducts,
  selectRouteParameters,
  (products, route) => products.find(p => p.id === +route.id)
);

export const getOrdersState = createFeatureSelector<fromOrders.OrdersState>('orders');
export const getOrders = createSelector(getOrdersState, fromOrders.selectAll);

export const selectCurrentOrder = createSelector(
  getOrders,
  selectRouteParameters,
  (orders, route) => orders.find(o => o.id === +route.id)
);
