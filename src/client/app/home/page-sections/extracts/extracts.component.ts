import { Component, OnInit, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'bp-extracts',
  templateUrl: 'extracts.component.html',
  styleUrls: ['extracts.component.css']
})
export class ExtractsComponent implements OnInit {
  
  @Input() datas: any;
  
  constructor() { }

  ngOnInit() {
  }

}
