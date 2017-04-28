import { BpSanitizerPipe } from './bp-sanitizer.pipe';
import { DomSanitizer } from '@angular/platform-browser';

describe('BpSanitizerPipe', () => {
  it('create an instance', () => {
    let domSanitizer: DomSanitizer;
    const pipe = new BpSanitizerPipe(domSanitizer);
    expect(pipe).toBeTruthy();
  });
});
