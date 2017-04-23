import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { WpPageStructure, WpPostStructure } from '../models/wp.datas-structure.interface';

import { WpApiService } from '../services/wpapi.service';

@Injectable()
export class HomeResolverService implements Resolve<WpApiService> {

    constructor(
        private wpapi: WpApiService,
        private router: Router
    ) { 
        console.info('called constructor');
    }
    /**
     * [resolve description]
     * @param  {ActivatedRouteSnapshot}   route [description]
     * @param  {RouterStateSnapshot}      state [description]
     * @return {Observable<WpApiService>}       [description]
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<WpApiService>{
        
        return this.wpapi.getPages()
        .map((datas: any) => datas);
    }
}
