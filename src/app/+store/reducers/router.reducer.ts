import { Params, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// @NgRx
import { ActionReducerMap } from '@ngrx/store';
import { RouterReducerState, RouterStateSerializer, routerReducer } from '@ngrx/router-store';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
  fragment: string;
}

export interface RouterState {
  router: RouterReducerState<RouterStateUrl>;
}

export const routerReducers: ActionReducerMap<RouterState> = {
  router: routerReducer
};

export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
    serialize(routerState: RouterStateSnapshot): RouterStateUrl {
        const { url } = routerState;
        const { queryParams } = routerState.root;

        let state: ActivatedRouteSnapshot = routerState.root;
        while (state.firstChild) {
            state = state.firstChild;
        }
        const { params, fragment } = state;

        // Only return an object including the URL, queryParams, params and fragment
        // instead of the entire snapshot
        return { url, queryParams, params, fragment };
    }
}

export const RouterStateSerializerProvider = {
    provide: RouterStateSerializer,
    useClass: CustomSerializer
};
