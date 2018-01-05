import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Http, RequestOptions } from '@angular/http';
import { tokenNotExpired, JwtHelper, AuthHttp, AuthConfig } from 'angular2-jwt';

import { OauthService } from './oauth.service';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {

    let config: {[index: string]: any} = {
    // let config: {[index: string]: string | number | Function} = {
        'tokenName': 'token',
        'tokenGetter': (() => sessionStorage.getItem('token')), // replace sessionStorage with internal storage service
        'globalHeaders': [{'Content-Type':'application/json'}],
    };
    return new AuthHttp(new AuthConfig(config), http, options);
}

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [{
    provide: AuthHttp,
    useFactory: authHttpServiceFactory,
    deps: [Http, RequestOptions]
  }],
  declarations: []
})
export class OauthModule { }
