import { ElementRef, Renderer2 } from '@angular/core';
import { BpSvgDirective } from './bp-svg.directive';

describe('BpSvgDirective', () => {
  it('should create an instance', () => {

    let el: ElementRef;
    let renderer: Renderer2;

    const directive = new BpSvgDirective(el, renderer);
    expect(directive).toBeTruthy();
  });
});
