import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { ContinueButtonComponent } from './components/continue-button/continue-button.component';
import { SelectedItemDirective } from './directives/selected-item.directive';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    HttpClientModule
  ],
  declarations: [
    ContinueButtonComponent,
    SelectedItemDirective
  ],
  exports: [
    CommonModule,
    TranslateModule,
    HttpClientModule,
    ContinueButtonComponent,
    SelectedItemDirective
  ]
})
export class SharedModule { }
