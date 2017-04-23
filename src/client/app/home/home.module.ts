import { NgModule } from '@angular/core';

import { WpApiService } from '../services/wpapi.service';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PageSectionsModule } from './page-sections/page-sections.module';
// import { NameListService } from '../shared/name-list/name-list.service';

@NgModule({
  /* import [] is all module used and necesary for this module to work properly. */
  imports: [
    HomeRoutingModule, 
    SharedModule,  
    PageSectionsModule
  ],
  /* declarations is all component known to this module; this remains private to this module. */
  declarations: [
    HomeComponent
  ],
  /* exports represents all component made public to any module importing this module. */
  exports: [HomeComponent],
  /* Each resolved component route based must provide used services on resolver */
  providers: [WpApiService]
})
export class HomeModule { }
