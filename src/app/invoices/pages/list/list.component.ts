import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Invoice } from '../../models';
import { InvoiceService } from '../../services/invoice.service';

@Component({
    selector   : 'app-list',
    templateUrl: './list.component.html',
    styleUrls  : [ './list.component.scss' ],
})
export class ListComponent implements OnInit {

    public list: Invoice[] = [];

    constructor(private route: ActivatedRoute,
                private service: InvoiceService) { }

    ngOnInit() {
        this.route.data
            .subscribe((res: { list: Invoice[] }) => {
                this.list = res.list;
            });
    }

    deleteInvoice(invoiceID) {
        this.service.delete(invoiceID);

        this.list = this.service.get();
    }
}
