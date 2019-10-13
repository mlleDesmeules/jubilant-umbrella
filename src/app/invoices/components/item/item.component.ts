import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { InvoiceItem } from '../../models';

@Component({
    selector   : '[invoice-item]',
    templateUrl: './item.component.html',
    styleUrls  : [ './item.component.scss' ],
})
export class ItemComponent implements OnInit {

    @Input() isEditing: boolean;
    @Input() item: InvoiceItem;
    @Input() index: number;
    @Input() form: FormGroup | AbstractControl;

    @Output() delete = new EventEmitter<any>();

    constructor() { }

    ngOnInit() {
    }

    getTotal() {
        if (this.isEditing) {
            return this.form.get(`unit`).value * this.form.get(`unitPrice`).value;
        } else {
            return this.item.getTotal();
        }
    }

    removeItem() {
        this.delete.emit();
    }
}
