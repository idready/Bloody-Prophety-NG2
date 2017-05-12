import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { HttpModule } from '@angular/http';

import { WindowService } from './services/window.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseModule } from './base/base.module';

import { HeaderModule } from './header/header.module';
import { FooterModule } from './footer/footer.module';
import { HomeModule } from './home/home.module';
import { BlogModule } from './blog/blog.module';

// @TODO: Add a pageNotFound component
@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpModule,
    BaseModule,
    HeaderModule,
    FooterModule,
    HomeModule,
    BlogModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    {
        provide: APP_BASE_HREF,
        useValue: '<%= APP_BASE %>'
    },
    {
        provide: WindowService,
        useValue: window
    }
  ],
  bootstrap: [AppComponent]

})

export class AppModule { }
