import { Component, ViewChild, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from './core/services/auth.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit {
  @ViewChild('appTitle', {static: false}) appTitle: ElementRef;

  constructor(private translate: TranslateService,
              private authService: AuthService,
              private renderer: Renderer2,
              private router: Router) {
    translate.setDefaultLang('en');
  }

  ngAfterViewInit() {
    this.translate.get('common.title')
      .pipe(take(1))
      .subscribe(translation => {
        this.renderer.setProperty(this.appTitle.nativeElement, 'innerHTML', translation);
      });
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
