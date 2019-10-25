import { Injectable } from '@angular/core';
import {
    CanActivate, CanActivateChild, CanLoad, Router, Route,
    ActivatedRouteSnapshot, RouterStateSnapshot
} from '@angular/router';
import { AuthService } from '../core/services/auth.service';


@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    canLoad(route: Route): boolean {
      const url = `/${route.path}`;
      return this.checkLogin(url);
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const url: string = state.url;
      return this.checkLogin(url);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        console.log('canActivateChild Guard is called');
        return this.canActivate(route, state);
    }

    checkLogin(url: string): boolean {
      if (this.authService.isLoggedIn) {
        return true;
      }

      this.authService.redirectUrl = url;

      this.router.navigate(['login']);
      return false;
    }
}
