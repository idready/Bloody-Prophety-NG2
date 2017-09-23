import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BpSanitizerPipe } from './pipes/bp-sanitizer.pipe';
import { BpSvgDirective } from './directives/bp-svg.directive';
import { CleanTransitionsDirective } from './directives/clean-transitions.directive';
import { SmartMenuDirective } from './directives/smart-menu.directive';
import { ScrollToDirective } from './directives/scroll-to.directive';
import { GoogleRecaptchaDirective } from './directives/google-recaptcha.directive';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [BpSanitizerPipe, BpSvgDirective, CleanTransitionsDirective, SmartMenuDirective, ScrollToDirective,
                GoogleRecaptchaDirective],
  exports: [BpSanitizerPipe, BpSvgDirective, CleanTransitionsDirective, SmartMenuDirective, ScrollToDirective,
            GoogleRecaptchaDirective]
})
export class BaseModule { }
