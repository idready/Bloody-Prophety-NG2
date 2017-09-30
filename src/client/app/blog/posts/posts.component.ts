import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { WpApiService } from '../../services/wpapi.service';
import { Comment } from '../../models/wp.config.interface';
import { WpPageStructure } from '../../models/wp.datas-structure.interface';
import { StorageService } from '../../services/storage.service';

@Component({
    moduleId: module.id,
    selector: 'bp-posts',
    templateUrl: 'posts.component.html',
    styleUrls: ['posts.component.css']
})
export class PostsComponent implements OnInit {

    isLoadingPosts: boolean;
    posts: WpPageStructure[];
    comments: Comment[];
    COMMENT_STATUS: Object = {
        APPROVED: 'approved',
        OPEN:     'open',
        CLOSED:   'closed',
        HOLD: 'hold'
    };

    constructor(
        private route: ActivatedRoute,
        private wpapi: WpApiService,
        private router: Router,
        private storage: StorageService
    ) {}

    ngOnInit() {

        this.isLoadingPosts = true;
        this.showPosts();
    }

    /**
     *
     * Fetch all posts
     * @memberof PostsComponent
     */
    showPosts() {

        this.posts = this.storage.get('POSTS'); // Since data is always resolved before we get down here;

        this.posts.forEach((elt: WpPageStructure, index: number, array: WpPageStructure[]) => {
            //Fetch comments
            elt.comments = [];
            this.fetchComments(+elt.id, index);
        });
        this.isLoadingPosts = false;
        this.storage.set('POSTS', this.posts);
    }

    /**
     *
     * Fetch post comments and assign it to corresponding post
     * @param {number} postId
     * @param {number} postIndex
     * @memberof PostsComponent
     */
    fetchComments(postId: number, postIndex: number) {

        this.wpapi.getPostComments(`${+postId}`).subscribe(
            (response: Comment | Comment[]) => {
                this.posts[postIndex as any].comments = response;
            },
            (errors: any) => {
                console.info(`Errors on post ${postId} comment fetch`);
            }
        );
    }

}
