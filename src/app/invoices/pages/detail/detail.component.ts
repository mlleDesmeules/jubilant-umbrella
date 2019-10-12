import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector   : 'app-invoice-detail',
    templateUrl: './detail.component.html',
    styleUrls  : [ './detail.component.scss' ],
})
export class DetailComponent implements OnInit {

    public form: FormGroup;

    constructor(private builder: FormBuilder) { }

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.form = this.builder.group({
            number   : this.builder.control(``),
            date     : this.builder.control(``),
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
        const group = this.builder.group({
            name: this.builder.control(``),
            unit: this.builder.control(0),
            unitPrice: this.builder.control(0),
        });

        return this.items.push(group);
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
        console.log(this.form.getRawValue());
    }
}
