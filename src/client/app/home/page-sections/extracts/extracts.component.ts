import { Component, OnInit, Input } from '@angular/core';

import { WpPageStructure } from '../../../models/wp.datas-structure.interface';
import { Quote } from '../../../models/quote.interface';

import { ExtractsService } from '../services/extracts.service';


@Component({
  moduleId: module.id,
  selector: 'bp-extracts',
  templateUrl: 'extracts.component.html',
  styleUrls: ['extracts.component.css']
})
export class ExtractsComponent implements OnInit {

    _datas: WpPageStructure;
    protected quotes: Quote | Quote[];

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

  constructor(private extractsService: ExtractsService){ }

  ngOnInit() {
      this.quotes = this.extractsService.extractContent(this._datas.acf.extraits_livre, ['title', 'content'], '<ligne>', '[SEP]');
  }

}
