import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlogComponent } from './blog.component';
import { PostComponent } from './post/post.component';


@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'blog', component: BlogComponent, children: [{
          path: 'post/:id', component: PostComponent
      }]}
    ])
  ],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
