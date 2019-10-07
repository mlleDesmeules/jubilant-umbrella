import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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

    save() {
        console.log(this.form.getRawValue());
    }
}
