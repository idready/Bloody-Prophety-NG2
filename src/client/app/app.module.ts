import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

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
    HeaderModule,
    FooterModule,
    HomeModule,
    BlogModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [{
    provide: APP_BASE_HREF,
    useValue: '<%= APP_BASE %>'
  }],
  bootstrap: [AppComponent]

})

export class AppModule { }
