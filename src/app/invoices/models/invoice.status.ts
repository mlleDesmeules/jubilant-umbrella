
export class InvoiceStatus {
    public id: number;
    public label: string;

    constructor(data: Partial<InvoiceStatus>) {
        Object.assign(this, data);
    }

    is(name): boolean {
        return this.label.toLowerCase() === name.toLowerCase();
    }
}

export const STATUSES = [
    new InvoiceStatus({id: 1, label: `Pending`}),
    new InvoiceStatus({id: 2, label: `Sent`}),
    new InvoiceStatus({id: 3, label: `Paid`}),
];
