import { Directive, Input, ElementRef, Renderer2, OnInit } from '@angular/core';

import { BloodLoaderDirective } from './blood-loader.directive';

describe('BloodLoaderDirective', () => {
  it('should create an instance', () => {

    let element: ElementRef;
    let renderer: Renderer2;
    const directive = new BloodLoaderDirective(element, renderer);
    expect(directive).toBeTruthy();
  });
});
