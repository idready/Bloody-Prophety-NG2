import { Inject, ElementRef, Directive, Input, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinct';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';

import { WindowService } from '../../services/window.service';

@Directive({
  selector: '[sticky]'
})
export class StickyHeaderDirective implements OnInit {
    
    @Input() stickyClassName: string = 'stickys';
    
    lastKnownScrollPos: number;
    currentScrollDirection = new Subject<string>();
    
    constructor(@Inject(WindowService) private _window: Window, private element: ElementRef, private renderer: Renderer2) { }
    
    ngOnInit(){
        
        this.lastKnownScrollPos = 0;
        this.currentScrollDirection.next('DOWN');
        
        this.startListeningEvent('scroll', this._window);
    }
    /**
     * [startListeningEvent description]
     * @param  {string = 'scroll'}    eventName [description]
     * @param  {Window}    listenOn [description]
     * @return undefined             [description]
     */
    startListeningEvent(eventName: string = 'scroll', listenOn: Window){
        
        let scrollEventListener$: Observable<number> = Observable.fromEvent(listenOn, eventName)
                                                   .debounceTime(200)
                                                   .map(() => +listenOn.scrollY)
                                                   .distinct();
                                                   
        scrollEventListener$.subscribe(
            (scrollY: number) => {
                // Emit current direction
                this.currentScrollDirection.next((this.lastKnownScrollPos >= scrollY) ? 'UP' : 'DOWN');
                // Update last known position
                this.lastKnownScrollPos = scrollY;
            },
            error => {
                console.warn(`Error: ${error}`);
            },
            () => {}
        );
        
        this.currentScrollDirection.subscribe(
            dir => {
                let body: HTMLBodyElement = this._window.document.querySelector('body');

                if(dir === 'UP' /*&& this.lastKnownScrollPos > this.element.nativeElement.height*/){
                    
                    // this.renderer.addClass(body, this.stickyClassName);
                    // this.renderer.addClass((this.renderer.parentNode(this.element.nativeElement)), this.stickyClassName);
                } else {
                    
                    //@TODO: Find out a proper way
                    // this.renderer.removeClass(body, this.stickyClassName);
                    // this.renderer.removeClass((this.renderer.parentNode(this.element.nativeElement)), this.stickyClassName);
                }
                
            },
            error => { console.warn(`Error on setting direction : ${error}`)}
        )
                              
    }
    
    ngOnDestroy(){
        this.currentScrollDirection.unsubscribe();
    }
}
