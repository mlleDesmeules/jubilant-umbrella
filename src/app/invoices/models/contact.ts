
export class Contact {
    public name: string;
    public address: string;

    constructor(data: Partial<Contact>) {
        Object.assign(this, data);
    }

}
