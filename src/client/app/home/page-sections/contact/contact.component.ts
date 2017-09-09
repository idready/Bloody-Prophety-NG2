import { Component, OnInit, OnChanges, Input, Inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Http, Headers, URLSearchParams } from '@angular/http';

import { WindowService } from '../../../services/window.service';

@Component({
  moduleId: module.id,
  selector: 'bp-contact',
  templateUrl: 'contact.component.html',
  styleUrls: ['contact.component.css']
})
export class ContactComponent implements OnInit, OnChanges {

    // @Input() datas: any;
    contactForm: FormGroup;
    nameChangeLog: string[] = [];
    feedback: {message: string, status: boolean, display?: boolean};

    constructor(@Inject(WindowService) private _window: Window, private frB: FormBuilder, private $http: Http) {}

    ngOnInit() {

        this.buildForm();
        this.logNameChange();
    }

    buildForm() {

        this.contactForm = this.frB.group({
            name: ['', [Validators.required, Validators.minLength(5)]],
            email: ['', [Validators.required, Validators.email]],
            message: ['', [Validators.required, Validators.minLength(10)]]
        });

        this.feedback = {
            message: '',
            status: false,
            display: false
        };

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
                if(data === 'INVALID' && this.feedback.display) {
                    this._window.setTimeout(() => {
                        this.resetFeedback();
                    }, 3000);
                }
            }
        );

        // this.contactForm.valueChanges.subscribe(
        //     (data) => {
        //         if(this.feedback.display) {
        //             this._window.setTimeout(() => {
        //                 this.resetFeedback();
        //             }, 3000);
        //         }
        //     }
        // );
    }

    postMessage(evt: Event) {

        if(evt) { evt.preventDefault(); }
        let data : {[index: string]: string} = Object.assign({}, this.contactForm.value);

        // @TODO: Change once server available
        const headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        const body = new URLSearchParams();
        for(let key in data) {
            body.append(key, data[key]);
        }

        this.$http.post('/handle-email', body.toString(), {headers})
        .subscribe(
            (response: any) => {

                let responseFeedback : any = response.json();
                console.log(responseFeedback);
                this.setFeedback({message: responseFeedback.message,
                    status: (responseFeedback.errors || !responseFeedback.valid) ? false : true, display: true});

                this.contactForm.reset();
                debugger;
            },
            (error: any) => { console.warn(error); }
        );
    }

    resetFeedback() {

        this.feedback = {
            message: '',
            status: false,
            display: false
        };
    }

    setFeedback(values: any) {
        this.feedback = Object.assign(this.feedback, values);
    }

    logNameChange() {

        const nameControl = this.contactForm.get('name');
        nameControl.valueChanges.forEach(
            (value: string) => this.nameChangeLog.push(value)
        );
    }

    mockForm() {

        this.contactForm.setValue({
            name: 'Foobar',
            email: 'bar@yopmail.com',
            message: 'Foo bar rulz you'
        });
    }

    ngOnChanges() {}

}
