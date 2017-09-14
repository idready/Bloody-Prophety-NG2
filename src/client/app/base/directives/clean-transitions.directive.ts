import { Directive, ElementRef, OnInit, OnDestroy, Inject, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import { WindowService } from '../../services/window.service';

@Directive({
  selector: '[cleanTransitions]'
})
export class CleanTransitionsDirective implements OnInit, OnDestroy {

    transitions: Observable<any> = new Observable<any>();

    constructor(@Inject(WindowService) private _window: Window, private element: ElementRef, private renderer: Renderer2) { }

    ngOnInit() {
        this.startListeningEvent('animationend');
    }

    /**
     * [startListeningEvent description]
     * @param  {string} eventName [description]
     * @return {[type]}           [description]
     */
    startListeningEvent(eventName: string) {

        this.transitions = Observable.fromEvent(this._window, eventName)
                                     .map((e: Event) => e)
                                     .filter((e: any) => {

                                        let classes: string[] = e.target.classList.value.split(' ');
                                        if(!classes.length) {return false;}
                                        // Only handled those with the class
                                        classes.filter((aClass: any) =>
                                            aClass.indexOf('animated') !== -1
                                        );
                                        return (classes.length > 0);
                                     });
        // Strip animation
        this.transitions.subscribe((e: Event) => {
            this.renderer.removeClass(e.target, 'animated');
        });
    }

    ngOnDestroy() {
        this.transitions = null;
    }
}
