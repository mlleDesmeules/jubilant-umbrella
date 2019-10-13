import { Injectable } from '@angular/core';
import { Invoice } from '../models';

@Injectable()
export class InvoiceService {

    private static STORAGE_KEY = `invoices`;

    constructor() { }

    /**
     * Get Storage
     *
     * This method will get the data from the local storage and parse it so it can be usable. In
     * case the storage doesn't exists, then an empty array will be returned.
     */
    private static getStorage() {
        return JSON.parse(localStorage.getItem(InvoiceService.STORAGE_KEY)) || [];
    }

    /**
     * Update storage
     *
     * This method will update the local storage data with the data passed as argument. The data will
     * also be stringify to be properly saved.
     */
    private static updateStorage(data) {
        localStorage.setItem(InvoiceService.STORAGE_KEY, JSON.stringify(data));
    }

    /**
     * Get next ID
     *
     * This method will find the highest ID existing in the list of bills and return the
     * next possible ID.
     */
    private static getNextID(): number {
        const list = InvoiceService.getStorage();
        const ids  = list.map((item) => item.id);

        //  if there is no IDs
        if (ids.length === 0) {
            ids.push(0);
        }

        return Math.max(...ids) + 1;
    }

    /**
     * Add
     *
     * This method will add the invoice to the list of invoices. It will set the invoice ID,
     * add the invoice to the list and save it.
     */
    public add(invoice: Invoice) {
        invoice.id = InvoiceService.getNextID();

        const list = InvoiceService.getStorage();
        list.push(invoice);

        InvoiceService.updateStorage(list);
    }

    /**
     * Delete
     *
     * This method will remove the invoice with the passed ID from the list and then resave
     * the list.
     */
    public delete(invoiceID: number) {
        const list = this.get().filter((invoice) => invoice.id !== invoiceID);

        InvoiceService.updateStorage(list);
    }

    /**
     * Get
     *
     * This method will get the invoices saved, map them to be actual Invoice and then return
     * the list.
     */
    public get(id ?: number) {
        const list = InvoiceService.getStorage()
                                   .map((invoice) => new Invoice(invoice));

        if (typeof id === `undefined`) {
            return list;
        }

        return list.filter((invoice) => invoice.id === id)[0];
    }
}
