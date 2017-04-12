import { Component, OnInit, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'bp-author',
  templateUrl: 'author.component.html',
  styleUrls: ['author.component.css']
})
export class AuthorComponent implements OnInit {
  
  @Input() datas: any;
  
  constructor() { }

  ngOnInit() {
  }

}
