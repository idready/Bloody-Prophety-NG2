import { Component, OnInit, Input } from '@angular/core';

import { WpPageStructure } from '../../../models/wp.datas-structure.interface';
import { Quote } from '../../../models/quote.interface';

import { ExtractsService } from '../services/extracts.service';

@Component({
  moduleId: module.id,
  selector: 'bp-book',
  templateUrl: 'book.component.html',
  styleUrls: ['book.component.css']
})
export class BookComponent implements OnInit {

    protected quote: Quote | Quote[];
    _datas: WpPageStructure;
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

    constructor(private extractsService: ExtractsService) {}

    ngOnInit() {
        this.quote = this.extractsService.extractContent(this._datas.acf.citatation_auteur, ['content', 'author', 'link'], '<ligne>');
    }

}
