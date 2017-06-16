import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BpSanitizerPipe } from './pipes/bp-sanitizer.pipe';
import { BpSvgDirective } from './directives/bp-svg.directive';
import { CleanTransitionsDirective } from './directives/clean-transitions.directive';
import { SmartMenuDirective } from './directives/smart-menu.directive';
import { ScrollToDirective } from './directives/scroll-to.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [BpSanitizerPipe, BpSvgDirective, CleanTransitionsDirective, SmartMenuDirective, ScrollToDirective],
  exports: [BpSanitizerPipe, BpSvgDirective, CleanTransitionsDirective, SmartMenuDirective, ScrollToDirective]
})
export class BaseModule { }
