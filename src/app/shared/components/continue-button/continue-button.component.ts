import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-continue-button',
  templateUrl: './continue-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContinueButtonComponent {
  @Output() redirect = new EventEmitter<void>();

  onRedirect(): void {
    this.redirect.emit();
  }
}
