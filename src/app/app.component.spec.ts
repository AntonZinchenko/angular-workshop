import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Component } from '@angular/core';


import { AppComponent } from './app.component';
import { RouterLinkStubDirective, RouterOutletStubComponent, RouterStub } from './products/pages/products-list/router-stubs';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from './core/services/auth.service';
import { AppSettings } from './core/services/app-settings.service';
import { LocalStorageService } from './core/services/local-storage.service';
import { Router } from '@angular/router';

let fixture: ComponentFixture<AppComponent>;
let  links: RouterLinkStubDirective[];
let  linkDes: DebugElement[];

@Component({ selector: 'app-msg-list', template: '' })
class MsgListStubComponent {}

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MsgListStubComponent,
        RouterLinkStubDirective,
        RouterOutletStubComponent
      ],
      providers: [AuthService, AppSettings, LocalStorageService,
        { provide: Router, useClass: RouterStub }],
      imports: [TranslateModule.forRoot()]
    });

    fixture = TestBed.createComponent(AppComponent);

    fixture.detectChanges();

    linkDes = fixture.debugElement.queryAll(
      By.directive(RouterLinkStubDirective)
    );

    links = linkDes.map(
      d => d.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective
    );
  });

  it('can click Admin link in template', () => {
    const adminLinkDe = linkDes[1];
    const adminLink = links[1];

    expect(adminLink.navigatedTo).toBeNull(
      'link should not have navigated yet'
    );

    adminLinkDe.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(adminLink.navigatedTo[0]).toBe('admin');
  });

  it('can click Cart link in template', () => {
    const cartLinkDe = linkDes[2];
    const cartLink = links[2];

    expect(cartLink.navigatedTo).toBeNull(
      'link should not have navigated yet'
    );

    cartLinkDe.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(cartLink.navigatedTo[0]).toBe('cart');
  });
});
