import { ElementRef, Renderer2 } from '@angular/core';
import { SmartMenuDirective } from './smart-menu.directive';
import { Store } from '@ngrx/store';

import { MenuState } from '../../models/menu.state';

describe('SmartMenuDirective', () => {
  it('should create an instance', () => {
    
    let element: ElementRef;
    let window: any;
    let renderer: Renderer2;
    let store: Store<MenuState>;
      
    const directive = new SmartMenuDirective(window, element, renderer, store);
    expect(directive).toBeTruthy();
  });
});
