import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Invoice, InvoiceItem, InvoiceStatus, STATUSES } from '../../models';
import { InvoiceService } from '../../services/invoice.service';

@Component({
    selector   : 'app-invoice-detail',
    templateUrl: './detail.component.html',
    styleUrls  : [ './detail.component.scss' ],
})
export class DetailComponent implements OnInit {

    public form: FormGroup;
    public statuses: InvoiceStatus[] = [];

    constructor(private builder: FormBuilder,
                private service: InvoiceService) { }

    ngOnInit() {
        this.createForm();

        this.statuses = STATUSES;
    }

    createForm() {
        this.form = this.builder.group({
            number   : this.builder.control(``),
            date     : this.builder.control(``),
            status   : this.builder.control(``),
            recipient: this.builder.group({
                name   : this.builder.control(``),
                address: this.builder.control(``),
            }),
            sender   : this.builder.group({
                name   : this.builder.control(``),
                address: this.builder.control(``),
            }),
            items: this.builder.array([]),
        });
    }

    get items() {
        return this.form.get(`items`) as FormArray;
    }

    addItem() {
        return this.items.push(this.createItem());
    }

    createItem() {
        return this.builder.group({
            name     : this.builder.control(``),
            unit     : this.builder.control(``),
            unitPrice: this.builder.control(``),
        });
    }

    getSubtotal(): number {
        let result = 0;

        this.items.controls.forEach((control) => {
            result += (control.get(`unit`).value * control.get(`unitPrice`).value);
        });

        return result;
    }

    getTaxes(): number {
        const subtotal = this.getSubtotal();

        return subtotal * 0.14;
    }

    getTotal(): number {
        return this.getSubtotal() + this.getTaxes();
    }

    removeItem(index: number) {
        this.items.removeAt(index);
    }

    save() {
        const invoice = new Invoice(this.form.getRawValue());

        this.service.add(invoice);
    }
}
