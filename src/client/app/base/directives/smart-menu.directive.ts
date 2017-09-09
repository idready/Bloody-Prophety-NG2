import { Directive, Inject, OnInit, OnDestroy, Input, ElementRef, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';
import { Store } from '@ngrx/store';

// @TODO: Add constant for Event and avoid this?
import { HeaderComponent } from '../../header/header/header.component';
import { MenuState } from '../../models/menu.state';
import { MenuLink } from '../../models/menu.link.interface';
import { WindowService } from '../../services/window.service';

@Directive({
  selector: '[smartMenu]'
})
export class SmartMenuDirective implements OnInit, OnDestroy {

    scroll: Observable<any> = new Observable<any>();
    resize: Observable<any> = new Observable<any>();

    offset: {[index: string]: any} = {};

    @Input()
    menuIds: MenuLink[];

    constructor(
        @Inject(WindowService) private _window: Window,
        private element: ElementRef, private renderer: Renderer2,
        private store: Store<MenuState>
    ) {}

    ngOnInit() {
        this.updateMenuItemOffset();
        this.startListeningEvents('scroll', 'resize');
    }

    /**
     * [startListeningEvent description]
     * @param  {string} eventName [description]
     * @return {[type]}           [description]
     */
    startListeningEvents(...eventsName: string[]) {

        this.scroll = Observable.fromEvent(this._window, eventsName[0])
                                .debounceTime(300)
                                .map((e: Event) => e);

        this.resize = Observable.fromEvent(this._window, eventsName[1])
                                .debounceTime(300)
                                .map((e: Event) => e);
        // Update offset and active item
        this.scroll.subscribe((e: Event) => { this.setActiveMenuItem(); });
        this.resize.subscribe((e: Event) => { this.updateMenuItemOffset(); });
    }

    /**
     * [updateMenuItemOffset description]
     * @return {[type]} [description]
     */
    updateMenuItemOffset() {

        let intervalUpdate: any = this._window.setInterval(() => {

            // @TODO: Try Observable.of(menuIds[])
            // @TODO: Find out a way to only load execute this once the sections are loaded: HINT: use store :D
            this._window.setTimeout(() => {
                if(this.menuIds.length) {

                    this._window.clearInterval(intervalUpdate);
                    this.menuIds.forEach((item: MenuLink, index: number, arr: Array<MenuLink>) => {

                        let sectionBlock: HTMLElement = <HTMLElement>this._window.document.querySelector(`#${item.page_id}`);
                        // Avoid empty or undefined sections
                        if(sectionBlock) {
                            this.offset[`${item.page_id}`] = {
                                [`offsetTop`]: sectionBlock.offsetTop, [`offsetBottom`]: sectionBlock.offsetTop + sectionBlock.clientHeight
                            };
                        }
                    });
                    this.setActiveMenuItem();
                    // console.info(` Menu length : ${this.menuIds.length}`);
                }
            }, 2000);

        }, 0);
    }

    /**
     * [setActiveMenuItem Set current menu index]
     * @return {[type]} [Dispatch the menu index]
     */
    setActiveMenuItem() {
        // console.info(` Set active menu ${this.menuIds}`);
        this.menuIds.forEach((item: MenuLink, index: number, arr: Array<MenuLink>) => {

            if(this.isSectionReached(`${item.page_id}`)) {

                // console.info(`Section : ${item}`);
                this.store.dispatch({
                    type: HeaderComponent.MenuEvents.SCROLLED_PAGE,
                    payload: {index: +item.page_position}
                });
            }
        });

    }

    /**
     * [isSectionReached Knows if a section is reached]
     * @param  {string}  section [description]
     * @return {boolean}         [description]
     */
    isSectionReached(section: string): boolean {

        if(this.offset[section]
            && Math.floor(this._window.pageYOffset + this.element.nativeElement.clientHeight) >= this.offset[section]['offsetTop']
            && Math.floor(this._window.pageYOffset) <= this.offset[section]['offsetBottom']) {
                // console.info(`Section : ${this.offset[section]}`);
                return true;
        }
        return false;
    }

    ngOnDestroy() {

        this.scroll = null;
        this.resize = null;
    }

}
