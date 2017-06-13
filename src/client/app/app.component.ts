import { Component, Input } from '@angular/core';
import { Config } from './shared/config/env.config';
import { Store } from '@ngrx/store';
import './operators';

/**
 * This class represents the main application component.
 */
@Component({
  moduleId: module.id,
  selector: 'bloody-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})
export class AppComponent {
  
  constructor() {
    console.log('Environment config', Config);
  }
}
