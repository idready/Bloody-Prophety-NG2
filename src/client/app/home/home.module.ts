import { NgModule } from '@angular/core';

import { StorageService } from '../services/storage.service';
import { WpApiService } from '../services/wpapi.service';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PageSectionsModule } from './page-sections/page-sections.module';

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
//   providers: [StorageService, WpApiService]
    // The code above is a shorthand of the code below
    providers: [
        {
            provide: StorageService,
            useClass: StorageService
        },
        {
            provide: WpApiService,
            useClass: WpApiService
        }
    ]
})
export class HomeModule { }
