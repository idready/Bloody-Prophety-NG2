import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NameListService } from './shared/name-list/name-list.service';

import { HomeComponent } from './home/home.component';
import { BlogComponent } from './blog/blog.component';

const blogRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'blog', component: BlogComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
        // [
      /* define app module routes here, e.g., to lazily load a module
         (do not place feature module routes here, use an own -routing.module.ts in the feature instead)
       */
    // ]
    blogRoutes
)
  ],
  exports: [RouterModule],
  providers: [NameListService]
})
export class AppRoutingModule { }
