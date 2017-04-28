import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookComponent } from './book/book.component';
import { AuthorComponent } from './author/author.component';
import { ExtractsComponent } from './extracts/extracts.component';
import { ContactComponent } from './contact/contact.component';

import { ExtractsService } from './services/extracts.service';
import { BaseModule } from '../../base/base.module';
import { EventsComponent } from './events/events.component';

@NgModule({
  imports: [
    CommonModule,
    BaseModule
  ],
  declarations: [BookComponent, AuthorComponent, ExtractsComponent, ContactComponent, EventsComponent],
  exports: [BookComponent, AuthorComponent, ExtractsComponent, ContactComponent, EventsComponent],
  providers: [ExtractsService]
})
export class PageSectionsModule { }
