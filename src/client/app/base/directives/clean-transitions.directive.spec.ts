import { ElementRef } from '@angular/core';

import { WindowService } from '../../services/window.service';
import { CleanTransitionsDirective } from './clean-transitions.directive';

describe('CleanTransitionsDirective', () => {
  it('should create an instance', () => {
      
    let element: ElementRef;
    let window: any;
    
    const directive = new CleanTransitionsDirective(window, element);
    expect(directive).toBeTruthy();
  });
});
