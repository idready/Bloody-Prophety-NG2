import { Injectable } from '@angular/core';
import { Router, Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import forkJoin from 'rxjs/add/observable/forkJoin';

import { WpApiService } from '../services/wpapi.service';
import { WpPageStructure } from '../models/wp.datas-structure.interface';

@Injectable()
export class BlogResolverService implements Resolve<WpPageStructure | WpApiService[]> {

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
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<WpPageStructure | WpApiService[]> {


        return this.wpapi.getPosts();

    }

}
