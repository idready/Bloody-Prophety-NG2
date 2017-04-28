import { ElementRef } from '@angular/core';
import { BpSvgDirective } from './bp-svg.directive';

describe('BpSvgDirective', () => {
  it('should create an instance', () => {
    let el: ElementRef;
    const directive = new BpSvgDirective(el);
    expect(directive).toBeTruthy();
  });
});
