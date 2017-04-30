import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Config } from './../shared/config/env.config';
import { WpConfig } from '../models/wp.config.interface';
import { StorageService } from './storage.service';
import { WpPageStructure, WpPostStructure } from '../models/wp.datas-structure.interface';


@Injectable()
export class WpApiService {
    
    private CONFIG: WpConfig;
    private isProd: string;
    
    constructor(private http: Http, private storage: StorageService) {
        
        this.isProd = (Config.ENV === 'PROD')? 'wp':'';
        
        this.CONFIG = {
            WP: {
                PAGES: `${this.isProd}/wp-json/wp/v2/pages`,
                POSTS: `${this.isProd}/wp-json/wp/v2/posts`,
                COMMENTS: `${this.isProd}/wp-json/wp/v2/comments`,
                CATEGORIES: `${this.isProd}/wp-json/wp/v2/catgories`
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
        
        // Use storage for uneditable datas like comments
        // let pages: WpPageStructure[] | any = this.storage.get('WP_PAGES'); 
        // if(pages) {
        //     return Observable.of(pages);
        // };
        
        return this.http
                   .get(`${this.CONFIG.WP.PAGES}`)
                   .map(response => {
                       this.storage.set('WP_PAGES', response.json());
                       return response.json();
                    });
    };
    
    /**
     * [getPosts description]
     * @return {Observable<any>} [description]
     */
    getPosts(): Observable<any> {
        
        // let posts: WpPageStructure[] | any = this.storage.get('WP_POSTS'); 
        // if(posts) {
        //     return Observable.of(posts);
        // };
        
        return this.http
                   .get(`${this.CONFIG.WP.POSTS}`)
                   .map(response => {
                       
                       this.storage.set('WP_POSTS', response.json());
                       return response.json();
                   });
    };

}
