import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import { StorageService } from '../services/storage.service';
import { WpPageStructure } from '../models/wp.datas-structure.interface';

@Component({
  moduleId: module.id,
  selector: 'bp-blog',
  templateUrl: 'blog.component.html',
  styleUrls: ['blog.component.css']
})
export class BlogComponent implements OnInit {

    private posts: WpPageStructure[];

    constructor(
        private storage: StorageService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {

        this.storage.remove('POSTS');

        this.route.data.subscribe(
            (response: {[index:string] : WpPageStructure[]}) => {

                this.posts = response[this.route.routeConfig.path];
                this.storage.set('POSTS', this.posts);
            },
            (errors: any) => console.warn(` Error on blog posts fetching ${errors}`)
        );

    }

}
