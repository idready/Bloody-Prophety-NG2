import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogComponent } from './blog.component';


@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'blog', component: BlogComponent}
    ])
  ],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
