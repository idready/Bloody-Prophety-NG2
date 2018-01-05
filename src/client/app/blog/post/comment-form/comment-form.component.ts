import { Component, OnInit, OnChanges, Input, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Http, Headers, URLSearchParams } from '@angular/http';

import { WpApiService } from '../../../services/wpapi.service';
import { WpPageStructure } from '../../../models/wp.datas-structure.interface';
import { WpConfig, Comment } from '../../../models/wp.config.interface';
import { WindowService } from '../../../services/window.service';
import { ContactFeedback, CaptchaResponse } from '../../../models/contact.feedback.interface';

@Component({
    moduleId: module.id,
    selector: 'comment-form',
    templateUrl: 'comment-form.component.html',
    styleUrls: ['comment-form.component.css']
})
export class CommentFormComponent implements OnInit {

    contactForm: FormGroup;
    feedback: ContactFeedback;
    defaultFeedback : ContactFeedback;
    isLoading: boolean;
    captchaWidgetId: number;
    author_ip: string = '127.0.0.1';

    @Input() postId: number;

    constructor(
        @Inject(WindowService) private _window: Window,
        private frB: FormBuilder,
        private $http: Http,
        private wpapi: WpApiService
    ) {}

    ngOnInit() {

        console.info('Comment form');
        this.buildForm();
        this.getClientIp();
    }

    /**
     *
     * Build form and set default feedback
     * @memberof CommentFormComponent
     */
    buildForm() {

        this.defaultFeedback = {
            message: '',
            status: false,
            display: false
        };
        this.resetFeedback();

        this.contactForm = this.frB.group({
            author_name: ['', [Validators.required, Validators.minLength(5)]],
            author_email: ['', [Validators.required, Validators.email]],
            author_url: ['', [Validators.nullValidator, this.validateUrl]],
            content: ['', [Validators.required, Validators.minLength(10)]],
            captcha: [null, Validators.nullValidator]
        });

        // Detects change of form status and post message
        this.contactForm.statusChanges.subscribe(

            (data) => {

                if(data === 'INVALID' && this.feedback.display) {
                    this._window.setTimeout(() => {
                        this.resetFeedback();
                    }, 3000);
                }
            }
        );
    }

    /**
     *
     * Retrieves client IP address, this is used for comment post and ease spam checking
     * @memberof CommentFormComponent
     */
    getClientIp() {

        this.$http.get('https://api.ipify.org').subscribe(
            (data: any) => { this.author_ip = data._body; },
            (error: any) => console.warn(`Error fetching user ip ${error}`)
        );
    }

    /**
     *
     * Post the client message and update feedback
     * @memberof ContactComponent
     */
    postMessage() {

        let data : {[index: string]: string} = Object.assign({}, this.contactForm.value, {post: this.postId});
        data = Object.assign(data, {
            post: +this.postId,
            // date: new Date(),
            // date_gmt: new Date(),
            // 'author_ip': this.author_ip
        });

        delete data.captcha;
        console.log(data);

        this.wpapi.postComment(data).subscribe(
            (response: Comment | Comment[]) => {
                console.info(response);
            }
        );
    }

    /**
     *
     * Custom validator for url strings
     * @param {FormControl} control
     * @returns boolean
     * @memberof CommentFormComponent
     */
    validateUrl(control: FormControl) {

        let URL_REGEXP: RegExp = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

        return URL_REGEXP.test(control.value) ? null : {
            validateUrl: {
                valid: false
            }
        };
    }

     /**
     *
     * Execute a captcha
     * @param {Event} evt
     * @memberof ContactComponent
     */
    checkInvisibleGoogleCaptcha(evt: Event) {

        if(evt) { evt.preventDefault(); }
        this._window['grecaptcha'].reset();
        this._window['grecaptcha'].execute();
        // this._window['grecaptcha'].execute(this.captchaWidgetId);
    }

    /**
     *
     * All said on the function's name
     * @memberof ContactComponent
     */
    resetFeedback() {
        this.setFeedback();
    }

    /**
     *
     * All said on the function's name
     * @param {*} [values]
     * @memberof ContactComponent
     */
    setFeedback(values?: any) {
        this.feedback = values ? Object.assign(this.feedback, values) : Object.assign({}, this.defaultFeedback);
    }

    /**
     *
     * All said on the function's name
     * @param {Event} evt
     * @memberof ContactComponent
     */
    updateFeedBack(evt: Event) {

        if(this.feedback.display) {
            this.resetFeedback();
        }
    }

    /**
     *
     * This is the callback the captcha use for success/failure callback
     * @param {string} token
     * @param {number} widgetId
     * @memberof ContactComponent
     */
    captchaResponse(token: string, widgetId: number) {

        this.captchaWidgetId = widgetId || 0;
        let status: string = token ? 'VALID' : 'INVALID';
        console.log(`Captcha response ${status} width the widget: ${this.captchaWidgetId}`);
    }

    recaptchaValidated(e: CaptchaResponse) {

        if(e && e.success) {
            this.postMessage();
            this._window['grecaptcha'].reset(this.captchaWidgetId);
        }
    }

    mockForm() {

        if(this.contactForm) {
            this.contactForm.setValue({
                author_name: 'Foobar',
                author_email: `barge.simpson@gmail.com`,
                author_url: 'www.example.com',
                content: 'Foo bar rulz you',
                captcha: ''
            });
        }
    }
}
