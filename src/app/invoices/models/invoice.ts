import { Contact } from './contact';
import { InvoiceItem } from './invoice.item';

export class Invoice {
    public id: number;
    public number: number;
    public date: string;
    public status: number;

    private _items: InvoiceItem[] = [];
    private _recipient: Contact;
    private _sender: Contact;

    constructor(data: Partial<Invoice>) {
        Object.assign(this, data);
    }

    get items() {
        return this._items;
    }

    set items(list) {
        list.forEach((item) => {
            this._items.push(new InvoiceItem(item));
        });
    }

    get recipient() {
        return this._recipient;
    }

    set recipient(data) {
        this._recipient = new Contact(data);
    }

    get sender() {
        return this._sender;
    }

    set sender(data) {
        this._sender = new Contact(data);
    }

    getSubtotal(): number {
        let result = 0;

        this.items.forEach((item) => {
            result += item.getTotal();
        });

        return result;
    }

    getTaxes(): number {
        return this.getSubtotal() * 0.14;
    }

    getTotal(): number {
        return this.getSubtotal() + this.getTaxes();
    }
}
