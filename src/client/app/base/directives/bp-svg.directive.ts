import { ElementRef, Directive, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[bpSvg]'
})
export class BpSvgDirective implements OnInit {
    /**
     * [Input Svg isDecorative, checks if we should flag the svg as decorative by adding an attribute aria-hidden]
     * @param  boolean 'svgTitle' [Used an alias just as a test]
     * Refer to https://css-tricks.com/accessible-svgs/ for more infos
     */
    @Input('svgIsDecorative') isDecorative: boolean = false;
    /**
     * [Input Svg title, here we are dealing with the svg fragment (id)]
     * @param  string 'svgTitle' [Used an alias just as a test]
     */
    @Input('svgTitle') title: string = '';
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
    /**
     * 
     * Here is an example of usage
     * <i class="icon icon-item" bpSvg [svgName]="'amazon'" ></i>
     * Is it preferable to add class icon on the container in which the svg content is injected
     * 
     * @param  {ElementRef} element [description]
     */
    constructor(private element: ElementRef){}
    
    ngOnInit(){
        
        let svgFileName: string = (this.file && this.file !== 'svg-defs') ? this.file : 'svg-defs';
        
        this.element.nativeElement.innerHTML = `<svg ${this.isDecorative ? 'aria-hidden="true"' : ''} class="icon icon-${this.name}" role="img">
            <title>${this.title}</title>
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="assets/svg-def/${svgFileName}.svg#shapes-icon-${this.name}"></use>
        </svg>`;
    }

}
