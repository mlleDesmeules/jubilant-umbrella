import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Invoice, InvoiceItem, InvoiceStatus, STATUSES } from '../../models';
import { InvoiceService } from '../../services/invoice.service';

@Component({
    selector   : 'app-invoice-detail',
    templateUrl: './detail.component.html',
    styleUrls  : [ './detail.component.scss' ],
})
export class DetailComponent implements OnInit {

    public isEditing: boolean;
    public isCreate: boolean;

    public invoice: Invoice;

    public form: FormGroup;
    public statuses: InvoiceStatus[] = [];

    constructor(private builder: FormBuilder,
                private route: ActivatedRoute,
                private service: InvoiceService) { }

    ngOnInit() {
        this.isEditing = true;
        this.isCreate  = true;

        this.statuses = STATUSES;
        this.invoice  = new Invoice({});

        this.createForm();

        this.route.data
            .subscribe((res) => {
                if (res.invoice) {
                    this.isCreate  = false;
                    this.isEditing = false;
                    this.invoice   = res.invoice;

                    this.createForm();
                }
            });
    }

    createForm() {
        this.form = this.builder.group({
            number   : this.builder.control(this.invoice.number || ``),
            date     : this.builder.control(this.invoice.date || ``),
            status   : this.builder.control(this.invoice.status || ``),
            recipient: this.builder.group({
                name   : this.builder.control(this.invoice.recipient.name || ``),
                address: this.builder.control(this.invoice.recipient.address || ``),
            }),
            sender   : this.builder.group({
                name   : this.builder.control(this.invoice.sender.name || ``),
                address: this.builder.control(this.invoice.sender.address || ``),
            }),
            items: this.builder.array([]),
        });

        this.invoice.items.forEach((item) => { this.addItem(item); });
    }

    get items() {
        return this.form.get(`items`) as FormArray;
    }

    addItem(item ?: InvoiceItem) {
        item = item || new InvoiceItem({});

        return this.items.push(this.createItem(item));
    }

    createItem(item: InvoiceItem) {
        return this.builder.group({
            name     : this.builder.control(item.name),
            unit     : this.builder.control(item.unit),
            unitPrice: this.builder.control(item.unitPrice),
        });
    }

    getSubtotal(): number {
        let result = 0;

        if (this.isEditing) {
            this.items.controls.forEach((control) => {
                result += (control.get(`unit`).value * control.get(`unitPrice`).value);
            });
        } else {
            result = this.invoice.getSubtotal();
        }

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
        if (this.isCreate) {
            const invoice = new Invoice(this.form.getRawValue());

            this.service.add(invoice);
        } else {
            this.invoice.setData(this.form.getRawValue());

            this.service.update(this.invoice.id, this.invoice);

            this.isEditing = false
        }
    }
}
