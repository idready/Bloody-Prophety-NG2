import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { WpApiService } from '../../services/wpapi.service';
import { WpPageStructure } from '../../models/wp.datas-structure.interface';
import { WpConfig, Comment } from '../../models/wp.config.interface';
import { StorageService } from '../../services/storage.service';

@Component({
  moduleId: module.id,
  selector: 'bp-post',
  templateUrl: 'post.component.html',
  styleUrls: ['post.component.css']
})
export class PostComponent implements OnInit {

    comments: Comment[] = [];
    COMMENT_STATUS: Object = {
        APPROVED: 'approved',
        OPEN:     'open',
        CLOSED:   'closed',
        HOLD: 'hold'
    };
    isLoadingPost: boolean = true;

    postData: WpPageStructure | any; //@TODO: How to initialize this kind of Object?

    constructor(
        private wpapi: WpApiService,
        private route: ActivatedRoute,
        private router: Router,
        private storage: StorageService
    ) { }

    ngOnInit() {

        const postId: number = +this.route.snapshot.paramMap.get('id');

        this.postData = [];
        this.postData.comments = [];

        if(this.storage.get('POSTS')) {

            this.wpapi.getPosts(postId).subscribe(
                (response: WpPageStructure) => {
                    this.postData = Object.assign(this.postData, response);
                    this.fetchPostComments();
                }
            );
        } else {

            let postIndex: number = this.storage.get('POSTS').findIndex((elt: WpPageStructure, index: number) => elt.id === postId);
            if(postIndex > -1) {
                this.postData = Object.assign(this.postData, this.storage.get('POSTS')[postIndex]);
            }
            if(!this.postData.comments.length) {
                this.fetchPostComments();
            }
        }

    }

    /**
     *
     * Fetch post comments and assign it to corresponding post
     * @param {number} postId
     * @param {number} postIndex
     * @memberof PostsComponent
     */
    fetchPostComments() {

        this.wpapi.getPostComments(`${+this.postData.id}`).subscribe(
            (response: Comment | Comment[]) => {

                this.postData.comments = response;
                this.isLoadingPost = false;
            },
            (errors: any) => {
                console.info(`Errors on post ${this.postData.id} comment fetch`);
            }
        );
    }

}
