import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import { Observable } from 'rxjs';

import { WpConfig } from '../models/wp.config.interface';

@Injectable()
export class WpApiService {
    
    private CONFIG: WpConfig;
    
    constructor(private http: Http) {
        
        this.CONFIG = {
            WP: {
                PAGES: "/wp-json/wp/v2/pages",
                POSTS: "/wp-json/wp/v2/posts",
                COMMENTS: "/wp-json/wp/v2/comments",
                CATEGORIES: "/wp-json/wp/v2/catgories"
            },
            COMMENTS_STATUS: {
                APPROVE: "APPROVE",
                PENDING: "PENDING",
                SPAM: "SPAM",
                DELETE: "DELETE",
                TRASH: "TRASH",
            }
        };
        
    }
    
    /**
     * [get description]
     * @param  {[type]} `${this.CONFIG.WP.PAGES}` [description]
     * @return {[type]}                           [description]
     */
    getPages = (): Observable<any> => {
        console.info('Called');
        return this.http
                   .get(`${this.CONFIG.WP.PAGES}`);
    };

}
