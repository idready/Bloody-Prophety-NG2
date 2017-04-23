import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import { Observable } from 'rxjs';

import { WpConfig } from '../models/wp.config.interface';

@Injectable()
export class WpapiService {
    
    private CONFIG: WpConfig;
    
    constructor(private http: Http) {
        
        this.CONFIG = {
            Wp: {
                PAGES: "/wp/v2/pages",
                POSTS: "/wp/v2/posts",
                COMMENTS: "/wp/v2/comments",
                CATEGORIES: "/wp/v2/catgories"
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
        
        return this.http
                   .get(`${this.CONFIG.WP.PAGES}`);
    };

}
