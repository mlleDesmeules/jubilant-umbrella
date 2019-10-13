import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Invoice } from '../../models';

@Component({
    selector   : 'app-list',
    templateUrl: './list.component.html',
    styleUrls  : [ './list.component.scss' ],
})
export class ListComponent implements OnInit {

    public list: Invoice[] = [];

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.route.data
            .subscribe((res: { list: Invoice[] }) => {
                this.list = res.list;
            });
    }

    deleteInvoice(invoiceID) {

    }
}
