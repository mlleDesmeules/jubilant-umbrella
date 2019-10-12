
export class InvoiceItem {
    public id: number;
    public name: string;
    public unitPrice: number;
    public unit: number;

    constructor(data: Partial<InvoiceItem>) {
        Object.assign(this, data);
    }

    getTotal() {
        return this.unitPrice * this.unit;
    }
}

