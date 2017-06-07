import { ElementRef, Renderer2 } from '@angular/core';
import { SmartMenuDirective } from './smart-menu.directive';

describe('SmartMenuDirective', () => {
  it('should create an instance', () => {
    
    let element: ElementRef;
    let window: any;
    let renderer: Renderer2;
      
    const directive = new SmartMenuDirective(window, element, renderer);
    expect(directive).toBeTruthy();
  });
});
