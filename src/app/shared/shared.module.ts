import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { ContinueButtonComponent } from './components/continue-button/continue-button.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    HttpClientModule
  ],
  declarations: [
    ContinueButtonComponent
  ],
  exports: [
    CommonModule,
    TranslateModule,
    HttpClientModule,
    ContinueButtonComponent
  ]
})
export class SharedModule { }
