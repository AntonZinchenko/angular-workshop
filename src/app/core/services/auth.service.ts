import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Injectable()
export class AuthService {
    isLoggedIn = false;
    redirectUrl: string;

    login(): Observable<boolean> {
        return of(true).pipe(
          delay(1000),
          tap(() => this.isLoggedIn = true));
    }

    logout(): void {
        this.isLoggedIn = false;
    }
}
