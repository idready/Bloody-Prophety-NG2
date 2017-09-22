import {
    ElementRef,
    Directive,
    Renderer2,
    Input,
    Output,
    OnInit,
    Inject,
    AfterViewInit,
    NgZone,
    Injector,
    forwardRef,
    EventEmitter,
    OpaqueToken // Remove this after test on @Inject
} from '@angular/core';

import {
    ControlValueAccessor,
    NgControl,
    Validators,
    FormControl,
    AbstractControl,
    NG_VALUE_ACCESSOR
} from '@angular/forms';
import { WindowService } from '../../services/window.service';

declare const grecaptcha: any;
declare global {
    interface Window {
        grecaptcha : any;
        reCaptchaLoad : () => void;
    }
}

/*
 * @NOTE:
 * Left Interface unsepared from the Class since we want it as standalone as possible
 *
 * */
export interface ReCaptchaConfig {
    theme? : 'dark' | 'light';
    type? : 'audio' | 'image';
    size? : 'compact' | 'normal' | 'inviisble';
    tabindex? : number;
}

export interface CaptchaResponse {
    success: boolean;
    challenge_ts: string; // timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
    hostname: string;  // the hostname of the site where the reCAPTCHA was solved
    'error-codes': any;
}

@Directive({
  selector: '[googleRecaptcha]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GoogleRecaptchaDirective),
      multi: true
    },
  ]
})
export class GoogleRecaptchaDirective implements OnInit, AfterViewInit, ControlValueAccessor {

    @Input() key: string;
    @Input() size: string;
    @Input() lang: string;
    /**
     * Callback used once the captcha is registered, this is called on failure and success (with a token)
     * @type {@Input}
     */
    @Input() callback: Function;
    /**
     * Default config to fit on captcha requirement
     * @type {@Input}
     */
    @Input() config: ReCaptchaConfig = {};
    //@TODO: Test an emitter
    //@Output() response: EventEmitter<CaptchaResponse>  = new EventEmitter<CaptchaResponse>();

    /**
     * ControlValueAccessor implementation
     **/
    private onChange: ( value : string ) => void;
    private onTouched: ( value : string ) => void;
    private control: FormControl;

    /**
     * Rendered captcha id
     **/
    private widgetId: number;

    constructor(
        @Inject(WindowService) private _window: Window,
        private element: ElementRef,
        private renderer: Renderer2,
        private ngZone: NgZone,
        private injector: Injector,
        // private control: myToken //@TODO: Make this work
    ) {}

    ngOnInit() {
        // @Note: Need to affect something in the function else it's not considered as the directive property
        this.onChange = (token: string) => token;
        this.onTouched = (value: string) => value;

        this.registerReCaptchaCallback();
        this.addScript();
    }

    ngAfterViewInit() {
        console.info('after view init hook');
        // Used Injector to avoid circular Injection error
        this.control = this.injector.get(NgControl).control;
        this.setValidator();
    }

    addScript() {
        // @TODO: Replace document by element/render method
        let script = document.createElement('script');
        const lang = this.lang ? '&hl=' + this.lang : '';
        let isExplicit = (this.size === 'invisible') ? '&render=explicit' : '';
        script.src = `https://www.google.com/recaptcha/api.js?onload=reCaptchaLoad${isExplicit}${lang}`;
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
    }

    registerReCaptchaCallback() {

        (this._window as any).reCaptchaLoad = () => {
            const config = {
                ...this.config,
                'type': 'image',
                'size': this.size ? 'invisible' : 'compact',
                'sitekey': this.key,
                'callback': this.onSuccess.bind(this),
                'expired-callback': this.onExpired.bind(this)
            };
            this.widgetId = this.render(this.element.nativeElement, config);
        };
    }

    onSuccess(token: string) {

        // Notify changes to Angular
        this.ngZone.run(() => {
            this.onChange(token);
            this.onTouched(token);
        });
        this.callback(token, this.widgetId);
    }

    onExpired() {

        // Notify changes to Angular
        this.ngZone.run(() => {
            this.onChange(null);
            this.onTouched(null);
        });
        this.callback('', this.widgetId);
    }

    render(element : HTMLElement, config: any) {
        return grecaptcha.render(element, config);
    }

    /**
   * Calling the setValidators doesn't trigger any update or value change event.
   * Therefore, we need to call updateValueAndValidity to trigger the update
   */
    setValidator() {
        // this.control.setValidators(Validators.required);
        this.control.updateValueAndValidity();
    }

    /**
     *
     * ControlValueAccessor implementation proerties
     */
    writeValue( obj : any ) : void {}

    registerOnChange( fn : any ) : void {
      this.onChange = fn;
    }

    registerOnTouched( fn : any ) : void {
      this.onTouched = fn;
    }
}
