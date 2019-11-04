import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { ContinueButtonComponent } from './components/continue-button/continue-button.component';
import { SortByPanelComponent } from './components/sort-by-panel/sort-by-panel.component';
import { SelectedItemDirective } from './directives/selected-item.directive';
import { OrderByPipe } from './pipes/order-by.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { ToStarsPipe } from './pipes/stars.pipe';

const compDirPipe = [
  ContinueButtonComponent,
  SortByPanelComponent,
  SelectedItemDirective,
  OrderByPipe,
  ToStarsPipe
];

const modules = [
  CommonModule,
  TranslateModule,
  HttpClientModule,
  ReactiveFormsModule
];

@NgModule({
  imports: [...modules],
  declarations: [...compDirPipe],
  exports: [...modules, ...compDirPipe]
})
export class SharedModule {}
