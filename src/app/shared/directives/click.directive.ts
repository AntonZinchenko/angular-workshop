import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

const DEFAULT_FONT_SIZE = 10;

@Directive({
  selector: '[appClickFontChanger]'
})
export class ClickDirective {
    @Input() baseFontSize: number;
    private el: HTMLElement;
    private counterValue = 0;

    constructor(private renderer: Renderer2, el: ElementRef) {
        this.el = el.nativeElement;
        this.baseFontSize = DEFAULT_FONT_SIZE;
    }

    @HostListener('click') onMouseClick() {
        const newFontSize = this.baseFontSize + (++this.counterValue);
        this.renderer.setStyle(this.el, 'fontSize', `${newFontSize}px`);

        const color = '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6);
        this.renderer.setStyle(this.el, 'backgroundColor', color);
    }
}
