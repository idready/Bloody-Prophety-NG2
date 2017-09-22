import { Component, OnInit, OnChanges, Input, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Http, Headers, URLSearchParams } from '@angular/http';

import { WindowService } from '../../../services/window.service';
import { ContactFeedback } from '../../../models/contact.feedback.interface';

@Component({
  moduleId: module.id,
  selector: 'bp-contact',
  templateUrl: 'contact.component.html',
  styleUrls: ['contact.component.css']
})
export class ContactComponent implements OnInit, OnChanges {

    contactForm: FormGroup;
    feedback: ContactFeedback;
    defaultFeedback : ContactFeedback;
    nameChangeLog: string[] = [];
    isLoading: boolean;
    captchaWidgetId: number;

    constructor(
        @Inject(WindowService) private _window: Window,
        private frB: FormBuilder,
        private $http: Http
    ) {}

    ngOnInit() {

        this.defaultFeedback = {
            message: '',
            status: false,
            display: false
        };

        this.buildForm();
        this.logNameChange();
    }

    ngOnChanges(value: any) {
        console.log(`changes gros ${value}`);
    }

    buildForm() {

        this.contactForm = this.frB.group({
            name: ['', [Validators.required, Validators.minLength(5)]],
            email: ['', [Validators.required, Validators.email]],
            message: ['', [Validators.required, Validators.minLength(10)]],
            // captcha: [null, validateCaptcha],
            captcha: [null, Validators.nullValidator]
        });

        this.resetFeedback();

        // Tests setValue && patchValue
        // @Note: this method won't fail silently when a property is not supply
        // this.contactForm.setValue({
        //     name: 'Foobar',
        //     email: 'bar@yopmail.com',
        //     message: 'Foo bar rulz you'
        // });
        // @Note: this method fails silently when a property is not supply and it's quite good at adding a single value
        // this.contactForm.patchValue({
        //     name: 'Foo',
        //     email: 'bar@yopmail.com',
        //     message: 'Foo bar rulz you'
        // });

        // Erase feedback if the status changes
        this.contactForm.statusChanges.subscribe(

            (data) => {

                let st: string = this.contactForm.status;

                if(data === 'INVALID' && this.feedback.display) {
                    this._window.setTimeout(() => {
                        this.resetFeedback();
                    }, 3000);
                }

                if(data === 'VALID' && this.contactForm.value.captcha) {
                    this.postMessage();
                    this._window['grecaptcha'].reset(this.captchaWidgetId);
                }
            }
        );

        // this.contactForm.valueChanges.subscribe(
        //     (data) => {
        //         // Checks form validity from captcha token
        //         let st: string = this.contactForm.status;
        //         console.info(data.captcha);
        //         if(data.captcha){
        //             console.info('Form valid');
        //         } else {
        //             console.info('Form invalid');
        //         }
        //         if(this.feedback.display) {
        //             this._window.setTimeout(() => {
        //                 // this.resetFeedback();
        //             }, 3000);
        //         }
        //     }
        // );
        // this.mockForm();
    }

    /**
     *
     * Custom validator exemple
     */
    validateCaptcha(ctr: FormControl): any {
        return null;
    }

    checkInvisibleGoogleCaptcha(evt: Event) {

        if(evt) { evt.preventDefault(); }
        this._window['grecaptcha'].execute(this.captchaWidgetId);
    }

    postMessage() {

        let data : {[index: string]: string} = Object.assign({}, this.contactForm.value);

        // @TODO: Change once server available
        const headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        const body = new URLSearchParams();
        for(let key in data) {
            body.append(key, data[key]);
        }

        this.$http.post('/handle-email', JSON.stringify(data), {headers})
        .subscribe(
            (response: any) => {

                let responseFeedback : any = response.json();
                console.log(responseFeedback);
                this.setFeedback({message: responseFeedback.message,
                    status: (responseFeedback.errors || !responseFeedback.valid) ? false : true, display: true});

                // this.contactForm.reset();
            },
            (error: any) => { console.warn(error); }
        );

    }

    resetFeedback() {
        this.setFeedback();
    }

    setFeedback(values?: any) {
        this.feedback = values ? Object.assign(this.feedback, values) : this.defaultFeedback;
    }

    updateFeedBack(evt: Event) {

        if(this.feedback.display) {
            this.resetFeedback();
        }
    }

    captchaResponse(token: string, widgetId: number) {

        this.captchaWidgetId = widgetId || 0;
        let status: string = token ? 'VALID' : 'INVALID';
        // console.log(`Captcha response ${status} width the widget: ${this.captchaWidgetId}`);
    }

    /**
     *
     * DEV DEBUG
     * All functions below are for debug purposes
     */
    logNameChange() {

        const nameControl = this.contactForm.get('name');
        nameControl.valueChanges.forEach(
            (value: string) => this.nameChangeLog.push(value)
        );
    }

    mockForm() {

        if(this.contactForm) {
            this.contactForm.setValue({
                name: 'Foobar',
                email: 'bar@yopmail.com',
                message: 'Foo bar rulz you',
                captcha: ' '
            });
        }
    }

}
