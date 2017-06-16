import { Directive, Input, OnInit, Inject } from '@angular/core';

import { WindowService } from '../../services/window.service';
import animateScrollTo from 'animated-scroll-to';

@Directive({
  selector: '[scrollTo]',
  host: {
    '(click)': 'onClick($event)'
  }
})
export class ScrollToDirective implements OnInit {
    
    /**
     * [Input DOM element used to scroll to]
     * @return {[type]} [description]
     */
    @Input()
    domId: string;
    
    scrollOptions: object;
    
    constructor(@Inject(WindowService) private _window: Window) { }
    
    ngOnInit(){
        
        this.scrollOptions = {
            speed: 500,
            minDuration: 250,
            maxDuration: 3000,
            cancelOnUserAction: true
        };
    }
    
    /**
     * [onClick scroll to the target]
     * @param  {Event}  event [description]
     * @return void       [description]
     */
    onClick(event: Event){
        
        if(event){ event.preventDefault(); }
        
        let target: Element = this._window.document.querySelector(`#${this.domId}`);
        if(!target){ return false; }
        
        let offset: number = (<HTMLElement>target).offsetTop;
        animateScrollTo(offset);
        
    }
    
}
