import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'bpSanitizer'
})
export class BpSanitizerPipe implements PipeTransform {

    constructor(
        private _sanitizer: DomSanitizer
    ) {
        console.log('PIPE');
    }
    /**
     * [transform sanitize common used values]
     * @param  {any}       value   [Value to be checked or trusted without any modification]
     * @param  {string}    context [Define context of the value]
     * @param  {string[]}  ...args [Could be used to send more specific values for any special treatment]
     * @return {any}               [Sanitized value]
     */
    transform(value: any, context: string = 'none', ...args: string[]): any {

        let sanitizeUtils: {[index: string]: Function} = {
            'NONE': () => this._sanitizer.sanitize(SecurityContext.NONE, value),
            'URL': () => this._sanitizer.bypassSecurityTrustUrl(value),
            'HTML': () => this._sanitizer.bypassSecurityTrustHtml(value),
            'CSS': () => this._sanitizer.bypassSecurityTrustStyle(value),
            'SCRIPT': () => this._sanitizer.bypassSecurityTrustScript(value),
            'RESOURCE_URL': () => this._sanitizer.bypassSecurityTrustResourceUrl(value),
        };

        return sanitizeUtils[context.toUpperCase()]();
    }

}
