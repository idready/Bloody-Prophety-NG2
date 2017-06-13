import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {Store, StoreModule} from "@ngrx/store";

import { MenuReducer } from '../reducers/menu.reducer';
import { HeaderComponent } from './header/header.component';
import { BaseModule } from '../base/base.module'

const storeManager = StoreModule.provideStore({ headerNavIndex: MenuReducer });

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BaseModule,
    storeManager
  ],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
  providers: []
})
export class HeaderModule {
}
