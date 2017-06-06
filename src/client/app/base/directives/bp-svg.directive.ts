import { ElementRef, Directive, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[bpSvg]'
})
export class BpSvgDirective implements OnInit {
    /**
     * [Input Svg isDecorative, checks if we should flag the svg as decorative by adding an attribute aria-hidden]
     * @param  boolean 'isDecorative' [Used an alias just for the test]
     * Refer to https://css-tricks.com/accessible-svgs/ for more infos
     */
    @Input('svgIsDecorative') isDecorative: boolean = false;
    /**
     * [Input Svg title, here we are dealing with the svg fragment (id)]
     * @param  string 'svgTitle' [Used an alias just for the test]
     */
    @Input('svgTitle') title: string = '';
    /**
     * [Input Svg name, here we are dealing with the svg fragment (id)]
     * @param  string 'svgName' [Used an alias just for the test]
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
     * @param  {Renderer2} renderer [description]
     */
    constructor(private element: ElementRef, private renderer: Renderer2){}
    
    ngOnInit(){
        
        let svgFileName: string = (this.file && this.file !== 'svg-defs') ? this.file : 'svg-defs';
        // focusable="false" is useful to avoid screenreader to read and IE to focus on the svg
        let svgContent: string = `<svg ${this.isDecorative ? 'aria-hidden="true" focusable="false"' : ''} class="icon icon-${this.name}" role="img">
             <title>${this.title}</title>
             <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="assets/svg-def/${svgFileName}.svg#shapes-icon-${this.name}"></use>
            </svg>`;
        this.renderer.setProperty(this.element.nativeElement, 'innerHTML', svgContent);
    }

}
