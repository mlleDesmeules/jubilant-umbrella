import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Contact } from '../../models';

@Component({
    selector   : 'app-invoice-contact',
    templateUrl: './contact.component.html',
    styleUrls  : [ './contact.component.scss' ],
})
export class ContactComponent {

    @Input() title: string;
    @Input() form: FormGroup | AbstractControl;

    @Input() contact: Contact;
    @Input() isEditing: boolean;

    constructor() { }

}
