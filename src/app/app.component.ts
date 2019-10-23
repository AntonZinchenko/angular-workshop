import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { AuthService } from './core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit, OnDestroy {
  @ViewChild('appTitle', {static: false}) appTitle: ElementRef;
  private sub: Subscription;

  constructor(private translate: TranslateService,
              private authService: AuthService,
              private router: Router) {
    translate.setDefaultLang('en');
  }

  ngAfterViewInit() {
    this.sub = this.translate.get('common.title').subscribe(translation => {
      this.appTitle.nativeElement.innerHTML = translation;
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
