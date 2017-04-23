import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { WpApiService } from '../services/wpapi.service';

@Injectable()
export class BlogResolverService implements Resolve<WpApiService> {

    constructor(
        private wpapi: WpApiService,
        private router: Router
    ) { 
        console.info('called constructor');
    }
    /**
     * [resolve Retrieves datas before Home componennt loads]
     * @param  {ActivatedRouteSnapshot}   route [description]
     * @param  {RouterStateSnapshot}      state [description]
     * @return {Observable<WpApiService>}       [Returns response already flatten with json fn of RxJs]
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<WpApiService>{
        
        return this.wpapi.getPosts();
    }

}
