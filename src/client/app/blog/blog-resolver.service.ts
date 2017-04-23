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
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<WpApiService>{
        console.warn('Resolving blog');
        return this.wpapi.getPages();
    }

}
