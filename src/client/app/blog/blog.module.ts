import { NgModule } from '@angular/core';

import { WpApiService } from '../services/wpapi.service';
import { CommonModule } from '@angular/common';
import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';
import { PostComponent } from './post/post.component';

@NgModule({
  imports: [
    CommonModule,
    BlogRoutingModule
  ],
  declarations: [BlogComponent, PostComponent],
  providers: []
})
export class BlogModule { }
