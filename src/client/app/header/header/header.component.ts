import { Component, OnInit } from '@angular/core';


@Component({
  moduleId: module.id,
  selector: 'bp-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
  // encapsulation: ViewEncapsulation.Emulated
})
export class HeaderComponent implements OnInit {

  linkIndex: number;

  constructor() {
    console.info('initialized header component');
  }

  ngOnInit() {
      
    this.linkIndex = 0;
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
