import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  moduleId: module.id,
  selector: 'bp-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
  // encapsulation: ViewEncapsulation.Emulated
})
export class HeaderComponent implements OnInit {

  linkIndex: number;

  constructor(private http: Http) {
    console.info('initialized header component');
  }

  ngOnInit() {

    this.linkIndex = 0;
    this.http.get('wp-json/wp/v2/posts')
        .map((datas: any) => console.info(datas))
        .subscribe((response: any) => console.info(response));
  }

  /**
   * [updateLinkIndex set current link]
   * @param  {number = 0}           index [description]
   * @return {[type]}      [description]
   */
  updateLinkIndex(index: number = 0) {

    this.linkIndex = index;
  }
}
