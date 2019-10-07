import { Contact } from './contact';
import { InvoiceItem } from './invoice.item';

export class Invoice {
    public id: number;
    public number: number;
    public date: string;
    public status: number;

    public recipient: Contact;
    public sender: Contact;
    public items: InvoiceItem[];

    constructor(data: Partial<Invoice>) {
        Object.assign(this, data);
    }

    getSubtotal(): number {
        let result = 0;

        this.items.forEach((item) => {
            result += (item.unitPrice * item.unit);
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
