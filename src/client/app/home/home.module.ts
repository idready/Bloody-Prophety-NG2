import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PageSectionsModule } from './page-sections/page-sections.module';
// import { NameListService } from '../shared/name-list/name-list.service';

@NgModule({
  imports: [
    HomeRoutingModule, 
    SharedModule,  
    PageSectionsModule
  ],
  declarations: [
    HomeComponent
  ],
  exports: [HomeComponent],
  providers: []
})
export class HomeModule { }
