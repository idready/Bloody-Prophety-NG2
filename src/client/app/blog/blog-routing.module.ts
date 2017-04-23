import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlogResolverService } from './blog-resolver.service';
import { BlogComponent } from './blog.component';
import { PostComponent } from './post/post.component';


@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'blog', component: BlogComponent, resolve: { blog: BlogResolverService}, children: [{
          path: 'post/:id', component: PostComponent
      }]}
    ])
  ],
  exports: [RouterModule],
  providers: [BlogResolverService]
})
export class BlogRoutingModule { }
