import { ElementRef, Renderer2 } from '@angular/core';

import { StickyHeaderDirective } from './sticky-header.directive';
import { WindowService } from '../../services/window.service';

describe('StickyHeaderDirective', () => {
  it('should create an instance', () => {

    let element: ElementRef;
    let window: any;
    let renderer: Renderer2;

    const directive = new StickyHeaderDirective(window, element, renderer);
    expect(directive).toBeTruthy();
  });
});
