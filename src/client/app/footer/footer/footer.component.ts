import { Component, OnInit } from '@angular/core';
import { Config } from '../../shared/config/env.config';

@Component({
  moduleId: module.id, // Insert module.id @TODO: Know what is this for
  selector: 'bp-footer',
  templateUrl: 'footer.component.html',
  styleUrls: ['footer.component.css'] // Css instead of scss
})
export class FooterComponent implements OnInit {

  private authorEmail: string;
  private cprDate: number;
  private fbUrl: string;

  constructor() {}

  ngOnInit() {

      this.authorEmail = Config.AUTHOR_EMAIL;
      this.cprDate = new Date().getUTCFullYear();
      this.fbUrl = Config.FB_WEBSITE_URL;
  }

}
