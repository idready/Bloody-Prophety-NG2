import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { HomeResolverService } from './home-resolver.service';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: HomeComponent, resolve: { home: HomeResolverService}}
    ])
  ],
  exports: [RouterModule],
  providers: [HomeResolverService]
})
export class HomeRoutingModule { }
