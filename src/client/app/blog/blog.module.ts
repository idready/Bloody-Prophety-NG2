import { NgModule } from '@angular/core';

import { WpApiService } from '../services/wpapi.service';
import { CommonModule } from '@angular/common';
import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';
import { PostComponent } from './post/post.component';
import { BaseModule } from '../base/base.module';
import { PostsComponent } from './posts/posts.component';
import { CommentComponent } from './post/comment/comment.component';

@NgModule({
  imports: [
    CommonModule,
    BaseModule,
    BlogRoutingModule
  ],
  declarations: [BlogComponent, PostComponent, PostsComponent, CommentComponent],
  exports: [BlogComponent, PostComponent, PostsComponent, CommentComponent],
  providers: []
})
export class BlogModule { }
