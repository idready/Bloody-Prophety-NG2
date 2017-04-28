import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BpSanitizerPipe } from './pipes/bp-sanitizer.pipe';
import { BpSvgDirective } from './directives/bp-svg.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [BpSanitizerPipe, BpSvgDirective],
  exports: [BpSanitizerPipe, BpSvgDirective]
})
export class BaseModule { }
