import { Component, OnInit, OnChanges, Input, Inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Http } from '@angular/http';

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

        this._window.setTimeout(() => {

            this.feedback = (Date.now() % 2) ?
            {message: 'Merci votre message a été envoyé avec succès.', status: true} :
            {message: 'Une erreur est survenu, merci de réessayer.', status: false};
            this.feedback.display = true;
            this.contactForm.reset();
        }, 1000);

        // @TODO: Change once server available
        // this.$http.post('requests/handle-mail.php', data)
        // .subscribe(
        //     (response: any) => { console.log(data.json); },
        //     (error: any) => { console.warn(error); }
        // );
    }

    resetFeedback() {

        this.feedback = {
            message: '',
            status: false,
            display: false
        };
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
