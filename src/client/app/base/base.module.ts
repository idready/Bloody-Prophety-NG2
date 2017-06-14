import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BpSanitizerPipe } from './pipes/bp-sanitizer.pipe';
import { BpSvgDirective } from './directives/bp-svg.directive';
import { CleanTransitionsDirective } from './directives/clean-transitions.directive';
import { SmartMenuDirective } from './directives/smart-menu.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [BpSanitizerPipe, BpSvgDirective, CleanTransitionsDirective, SmartMenuDirective],
  exports: [BpSanitizerPipe, BpSvgDirective, CleanTransitionsDirective, SmartMenuDirective]
})
export class BaseModule { }
