import { Injectable } from '@angular/core';
import { Quote } from '../../../models/quote.interface';

@Injectable()
export class ExtractsService {

  constructor() { }
  /**
   * [extractContent Extracts and formats content from a content by using provided separator]
   * @param  {string}   extracts     [Content from which the parts are extracted from]
   * @param  {string[]} ...separator [Separators, if only one provided the extracted is simpler]
   * @return {Quote}                 [description]
   */
  extractContent(extracts: string, extractKeys: string[], ...separator: string[]): Quote | Quote[] {
    
    let needle: string = '[SEP]';
    /**
     * Needs explanation here:
     * let result: Quote | Quote[]; doesn't work when one tries to store on any index like extractKeys;
     */
    let result: {[index: string]: Quote | Quote[]} = {};
    
    if(separator.indexOf(needle) !== -1){
        
        let lines: string[] = extracts.split(`${needle}`);
        result[0] = lines.map((line: string): Quote => {
            
            return {
                title: line.split(separator[0])[0],
                content: line.split(separator[1])[1],
            };
        });
    } else {

        let lines: string[] = extracts.split(separator[0]);
        extractKeys.forEach((key: string, index: number) => {
            result[key] = lines[index];
        });
    }

    return result;
  }
}
