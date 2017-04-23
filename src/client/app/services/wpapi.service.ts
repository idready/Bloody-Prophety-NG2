import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import { Observable } from 'rxjs';

import { WpConfig } from '../models/wp.config.interface';
import { WpPageStructure, WpPostStructure } from '../models/wp.datas-structure.interface';


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
     * [getPages description]
     * @return {Observable<any>} [description]
     */
    getPages(): Observable<any> {
        return this.http
                   .get(`${this.CONFIG.WP.PAGES}`)
                   .map(response => response.json());
    };
    
    /**
     * [getPosts description]
     * @return {Observable<any>} [description]
     */
    getPosts(): Observable<any> {
        return this.http
                   .get(`${this.CONFIG.WP.POSTS}`)
                   .map(response => response.json());
    };

}
