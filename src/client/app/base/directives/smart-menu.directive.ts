import { Directive, Inject, OnInit, Input, ElementRef, RendererV2 } from '@angular/core';
import { Observable, Subject } from 'rxjs/RX';

import { MenuLink } from '../../models/menu.link.interface';
import { WindowService } from '../../services/window.service';

@Directive({
  selector: '[smartMenu]'
})
export class SmartMenuDirective {
    
    scroll: Observable<any> = new Observable<any>();
    resize: Observable<any> = new Observable<any>();
    
    offset: {[index: string]: any} = {};
    
    @Input()
    menuIds: MenuLink[];
    
    constructor(@Inject(WindowService) private _window: Window, private element: ElementRef, private renderer: RendererV2) { }

    ngOnInit(){
        
        console.log(this.menuIds);
        this.updateMenuItemOffset();
        this.setActiveMenuItem();
    
        this.startListeningEvents('scroll', 'resize');
    }
    
    /**
     * [startListeningEvent description]
     * @param  {string} eventName [description]
     * @return {[type]}           [description]
     */
    startListeningEvents(...eventsName: string[]){
        
        this.scroll = Observable.fromEvent(this._window, eventsName[0])
                                .debounceTime(300)
                                .map((e: Event) => e);
        
        this.resize = Observable.fromEvent(this._window, eventsName[1])
                                .debounceTime(300)
                                .map((e: Event) => e);
                                
        // Update offset and active item
        this.scroll.subscribe((e: Event) => { console.info('scroll', e); this.setActiveMenuItem()});                                            
        this.resize.subscribe((e: Event) => { console.info('resize', e); this.updateMenuItemOffset(); });                                            
    }
    
    /**
     * [updateMenuItemOffset description]
     * @return {[type]} [description]
     */
    updateMenuItemOffset(){
        
        this.menuIds.forEach((item: MenuLink, index: number, arr: Array<MenuLink>) => {
            
            let menuSection: HTMLElement = <HTMLElement>this._window.document.querySelector(`#${item.page_id}`);
            // Avoid empty or undefined sections
            if(menuSection){
                
                this.offset[`${item.page_id}`] = {[`offsetTop`]: menuSection.offsetTop, [`offsetBottom`]: menuSection.offsetTop + menuSection.clientHeight};
            }
        });
        
        this.setActiveMenuItem();
    }
    
    setActiveMenuItem(){

        this.menuIds.forEach((item: MenuLink, index: number, arr: Array<MenuLink>) => {
            // console.log(this.offset);
            
            const debug: {[index: string]: string} = {};
            console.log(this.offset);
            if(this.offset[`${item.page_id}`] && Math.floor(this._window.pageYOffset + this.element.nativeElement.clientHeight) >= this.offset[`${item.page_id}`]['offsetTop'] &&
            Math.floor(this._window.pageYOffset) <= this.offset[`${item.page_id}`]['offsetBottom']){
                console.info(`In : ${item.page_id}`);
            } else {
                debug.id = `${item.page_id}`;
                debug.offset = this.offset[`${item.page_id}`];
                debug.wOffset = `${Math.floor(this._window.pageYOffset)}`;
                console.info('Footer!');
            }
        });
    };

    ngOnDestroy(){
        
        this.scroll = null;
        this.resize = null;
    }

}
