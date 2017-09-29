import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlogResolverService } from './blog-resolver.service';
import { BlogComponent } from './blog.component';
import { PostComponent } from './post/post.component';
import { PostsComponent } from './posts/posts.component';


@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'blog', component: BlogComponent, resolve: { blog: BlogResolverService}, children: [
        {
            path: '', component: PostsComponent
        },
        {
            path: 'post/:id', component: PostComponent, pathMatch: 'full'
        }
    ]}
    ])
  ],
  exports: [RouterModule],
  providers: [BlogResolverService]
})
export class BlogRoutingModule { }
