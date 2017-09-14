import { ElementRef, Renderer2 } from '@angular/core';

import { WindowService } from '../../services/window.service';
import { CleanTransitionsDirective } from './clean-transitions.directive';

describe('CleanTransitionsDirective', () => {
  it('should create an instance', () => {

    let element: ElementRef;
    let window: any;
    let renderer: Renderer2;

    const directive = new CleanTransitionsDirective(window, element, renderer);
    expect(directive).toBeTruthy();
  });
});
