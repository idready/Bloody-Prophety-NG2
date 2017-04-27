import { ElementRef, Directive, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[bpSvg]'
})
export class BpSvgDirective implements OnInit {
    /**
     * [Input Svg name, here we are dealing with the svg fragment (id)]
     * @param  string 'svgName' [Used an alias just as a test]
     */
    @Input('svgName') name: string;
    /**
     * [Input Svg file here is the file from which the fragment(id) is extracted from; default is 'svg-defs']
     * @param  string 'svgFile' [description]
     */
    @Input('svgFile') file: string;
    
    constructor(private element: ElementRef){}
    
    ngOnInit(){
        
        let svgFileName: string = (this.file && this.file !== 'svg-defs') ? this.file : 'svg-defs';
        
        this.element.nativeElement.innerHTML = `<svg class="icon icon-${this.name}" role="img">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="assets/svg-def/${svgFileName}.svg#shapes-icon-${this.name}"></use>
        </svg>`;
    }

}
