import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookComponent } from './book/book.component';
import { AuthorComponent } from './author/author.component';
import { ExtractsComponent } from './extracts/extracts.component';
import { ContactComponent } from './contact/contact.component';

import { ExtractsService } from './services/extracts.service';
import { BaseModule } from '../../base/base.module';

@NgModule({
  imports: [
    CommonModule,
    BaseModule
  ],
  declarations: [BookComponent, AuthorComponent, ExtractsComponent, ContactComponent],
  exports: [BookComponent, AuthorComponent, ExtractsComponent, ContactComponent],
  providers: [ExtractsService]
})
export class PageSectionsModule { }
