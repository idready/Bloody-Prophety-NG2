import { NgModule } from '@angular/core';

import { WpApiService } from '../services/wpapi.service';
import { CommonModule } from '@angular/common';
import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';
import { PostComponent } from './post/post.component';
import { BaseModule } from '../base/base.module';
import { PostsComponent } from './posts/posts.component';

@NgModule({
  imports: [
    CommonModule,
    BaseModule,
    BlogRoutingModule
  ],
  declarations: [BlogComponent, PostComponent, PostsComponent],
  exports: [BlogComponent, PostComponent, PostsComponent],
  providers: []
})
export class BlogModule { }
