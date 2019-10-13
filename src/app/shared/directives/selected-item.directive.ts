import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

enum RowBackgroundColor {
  Active = '#eee',
  Inactive = 'white'
}

@Directive({
  selector: '[appSelectedItem]'
})
export class SelectedItemDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {
  }

  @HostListener('mouseover') onMouseOver() {
    this.changeBackground(RowBackgroundColor.Active);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.changeBackground(RowBackgroundColor.Inactive);
  }

  private changeBackground(color: string) {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', color);
  }
}
