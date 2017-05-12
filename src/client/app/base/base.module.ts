import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BpSanitizerPipe } from './pipes/bp-sanitizer.pipe';
import { BpSvgDirective } from './directives/bp-svg.directive';
import { StickyHeaderDirective } from './directives/sticky-header.directive';
import { CleanTransitionsDirective } from './directives/clean-transitions.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [BpSanitizerPipe, BpSvgDirective, StickyHeaderDirective, CleanTransitionsDirective],
  exports: [BpSanitizerPipe, BpSvgDirective, StickyHeaderDirective, CleanTransitionsDirective]
})
export class BaseModule { }
