import { InjectionToken } from '@angular/core';

export const WindowService = new InjectionToken('WindowService');

// https://gist.github.com/gdi2290/f8a524cdfb1f54f1a59c
// import {Injectable, Provider} from '@angular/core';
// import {window} from '@angular/src/facade/';
// import {unimplemented} from '@angular/src/facade/exceptions';
//
// import {OpaqueToken} from '@angular/core/di';
// import {CONST_EXPR} from '@angular/src/facade/lang';
//
//
// function _window(): any {
//   return window
// }
//
// export const WINDOW: OpaqueToken = CONST_EXPR(new OpaqueToken('WindowToken'));
//
// export abstract class WindowRef {
//   get nativeWindow(): any {
//     return unimplemented();
//   }
// }
//
// export class WindowRef_ extends WindowRef {
//   constructor() {
//     super();
//   }
//   get nativeWindow(): any {
//     return _window();
//   }
// }
//
//
// export const WINDOW_PROVIDERS = [
//   new Provider(WindowRef, {useClass: WindowRef_}),
//   new Provider(WINDOW, {useFactory: _window, deps: []}),
// ];
