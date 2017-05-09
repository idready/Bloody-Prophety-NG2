import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { BaseModule } from '../base/base.module'
import { WpApiService } from '../services/wpapi.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BaseModule
  ],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
  providers: [WpApiService]
})
export class HeaderModule {
}
