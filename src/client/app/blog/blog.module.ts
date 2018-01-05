import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { WpApiService } from '../services/wpapi.service';
import { CommonModule } from '@angular/common';
import { BaseModule } from '../base/base.module';
import { BlogComponent } from './blog.component';
import { PostComponent } from './post/post.component';
import { PostsComponent } from './posts/posts.component';
import { BlogRoutingModule } from './blog-routing.module';
import { CommentComponent } from './post/comment/comment.component';
import { CommentFormComponent } from './post/comment-form/comment-form.component';

@NgModule({
  imports: [
    CommonModule,
    BaseModule,
    ReactiveFormsModule,
    BlogRoutingModule
  ],
  declarations: [BlogComponent, PostComponent, PostsComponent, CommentComponent, CommentFormComponent],
  exports: [BlogComponent, PostComponent, PostsComponent, CommentComponent, CommentFormComponent],
  providers: []
})
export class BlogModule { }
