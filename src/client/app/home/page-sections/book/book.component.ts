import { Component, OnInit, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'bp-book',
  templateUrl: 'book.component.html',
  styleUrls: ['book.component.css']
})
export class BookComponent implements OnInit {

  @Input() datas: any;

  constructor() {}

  ngOnInit() {
    console.info('Init book ', this.datas);
  }

}
