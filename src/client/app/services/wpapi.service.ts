import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import toPromise from 'rxjs/add/operator/toPromise';

import { Config } from './../shared/config/env.config';
import { WpConfig, Comment } from '../models/wp.config.interface';
import { StorageService } from './storage.service';
import { WpPageStructure, WpPostStructure } from '../models/wp.datas-structure.interface';


@Injectable()
export class WpApiService {

    private CONFIG: WpConfig;
    private isProd: string;

    constructor(
        private http: Http,
        private storage: StorageService
    ) {

        this.isProd = (Config.ENV === 'PROD')? 'wp':'';

        this.CONFIG = {
            WP: {
                PAGES: `${this.isProd}/wp-json/wp/v2/pages`,
                POSTS: `${this.isProd}/wp-json/wp/v2/posts`,
                COMMENTS: `${this.isProd}/wp-json/wp/v2/comments`,
                CATEGORIES: `${this.isProd}/wp-json/wp/v2/catgories`
            },
            COMMENTS_STATUS: {
                APPROVE: 'APPROVE',
                PENDING: 'PENDING',
                SPAM: 'SPAM',
                DELETE: 'DELETE',
                TRASH: 'TRASH',
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
                   .map(response => {
                       this.storage.set('WP_PAGES', response.json());
                       return response.json();
                    });
    }

    /**
     * [getPosts description]
     * @return {Observable<WpPageStructure | WpApiService[]>} [description]
     */
    getPosts(postId?: number): Observable<WpPageStructure | WpApiService[]> {

        const id: string = postId ? `/${postId}` : '';

        return this.http
                   .get(`${this.CONFIG.WP.POSTS.concat(id)}`)
                   .map(response => {

                       this.storage.set('WP_POSTS', response.json());
                       return response.json();
                   });
    }

    getPostComments(postId?: string): Observable<Comment | Comment[]> {

        const commentsId = postId ? `?post=${postId}` : ``;

        return this.http
                    .get(`${this.CONFIG.WP.COMMENTS}/${commentsId}`)
                    .map(response => {

                        this.storage.set('WP_POSTS_COMMENTS', response.json());
                        return response.json();
                    });
    }

}
