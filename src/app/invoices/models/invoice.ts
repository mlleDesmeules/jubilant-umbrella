import { Contact } from './contact';
import { InvoiceItem } from './invoice.item';
import { InvoiceStatus, STATUSES } from './invoice.status';

export class Invoice {
    public id: number;
    public number: number;
    public date: string;
    public status: number;

    public items: InvoiceItem[] = [];
    public recipient: Contact;
    public sender: Contact;

    constructor(data: Partial<Invoice>) {
        Object.assign(this, data);

        this.setItems(data.items);
        this.setRecipient(data.recipient);
        this.setSender(data.sender);
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

    getStatus(): InvoiceStatus {
        const current = this.status || 1;

        return STATUSES.filter((status) => status.id === current)[0];
    }

    isPending(): boolean {
        return this.getStatus().is(`Pending`);
    }

    isSent(): boolean {
        return this.getStatus().is(`Sent`);
    }

    isPaid(): boolean {
        return this.getStatus().is(`Paid`);
    }

    setItems(list) {
        this.items = [];

        list.forEach((item) => {
            this.items.push(new InvoiceItem(item));
        });
    }

    setRecipient(data) {
        this.recipient = new Contact(data);
    }

    setSender(data) {
        this.sender = new Contact(data);
    }
}
