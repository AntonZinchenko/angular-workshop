import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthService,
              private router: Router) { }

  login() {
    this.authService.login().subscribe(() => {
      if (this.authService.isLoggedIn) {

        const redirect = this.authService.redirectUrl
          ? this.authService.redirectUrl : '/admin';

        this.router.navigate([redirect]);
      }
    });
  }
}
