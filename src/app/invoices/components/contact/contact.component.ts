import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
    selector   : 'app-invoice-contact',
    templateUrl: './contact.component.html',
    styleUrls  : [ './contact.component.scss' ],
})
export class ContactComponent {

    @Input() title: string;
    @Input() contact: FormGroup | AbstractControl;

    constructor() { }

}
