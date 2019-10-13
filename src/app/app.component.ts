import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit, OnDestroy {
  @ViewChild('appTitle', {static: false}) appTitle: ElementRef;
  private sub: Subscription;

  constructor(private translate: TranslateService) {
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
}
