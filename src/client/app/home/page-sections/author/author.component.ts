import { Component, OnInit, Input } from '@angular/core';

import { WpPageStructure } from '../../../models/wp.datas-structure.interface';

@Component({
  moduleId: module.id,
  selector: 'bp-author',
  templateUrl: 'author.component.html',
  styleUrls: ['author.component.css']
})
export class AuthorComponent implements OnInit {
  
  private _datas: WpPageStructure;

  /**
   * [Input Datas received from resolved route]
   * @return {WpPageStructure} [description]
   */
  @Input() 
  set datas(datas: WpPageStructure) {
      this._datas = datas;
  }
  
  get datas(): WpPageStructure {
      return this._datas;
  }
  
  constructor(){}

  ngOnInit() {}

}
