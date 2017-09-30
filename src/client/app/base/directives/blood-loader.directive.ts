import { Directive, Input, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[bloodLoader]'
})
export class BloodLoaderDirective implements OnInit {

    @Input() display: boolean;
    @Input() transitionInOut: string [];

    constructor(
        private element: ElementRef,
        private renderer: Renderer2
    ) {}

    ngOnInit() {
        console.info('Init loader dir');

        if(!this.transitionInOut || !this.transitionInOut.length) {
            this.transitionInOut = ['fadeIn', 'fadeOut'];
        }

        let transitionClasses: string = this.display ? this.transitionInOut[0] : this.transitionInOut[1];
        let loaderContent: string = `
            <div class="blood-container ${transitionClasses} animated">
                <div class="blood">
                    <span class="drop moving"></span>
                    <span class="drop"></span>
                    <span class="drop"></span>
                    <span class="drop"></span>
                    <span class="drop"></span>
                </div>
            </div>
        `;
        this.renderer.setProperty(this.element.nativeElement, 'innerHTML', loaderContent);
    }

}
