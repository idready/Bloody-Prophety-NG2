import { Injectable, Inject } from '@angular/core';
import { WindowService } from './window.service';

@Injectable()
export class StorageService {

    private STORAGE_KEY: string = 'bp_storage';

    constructor(@Inject(WindowService) private _window: Window) {}

    /**
     * [get description]
     * @param  {string} property [Property used as key to retrieve datas; this property is concatenated with service key]
     * @return {any}             [Parse datas, used any since this allow more flexibility for storage]
     */
    get(property: string): any {
        return JSON.parse(this._window.localStorage.getItem(this.STORAGE_KEY.concat(`_${property}`)));
    }

    /**
     * [set description]
     * @param  {string} property [Property used as key to retrieve datas]
     * @param  {any}    value    [Datas to store, used any since this allow more flexibility for storage]
     */
    set(property: string, value: any) {
        this._window.localStorage.setItem(this.STORAGE_KEY.concat(`_${property}`), JSON.stringify(value));
    }

    /**
     * [remove description]
     * @param  {string} property [Property used as key to retrieve datas]
     */
    remove(property: string) {
        this._window.localStorage.removeItem(this.STORAGE_KEY.concat(`_${property}`));
    }

    /**
     * [Clear localStorage]
     * @return {[type]} [description]
     */
    clear() {
        this._window.localStorage.clear();
    }

    /**
     * [LocalStorage length]
     * @return {number} [description]
     */
    lengthOf(): number {
        return this._window.localStorage.length;
    }

}
