export class ShippingInfo {
    public firstName: string;
    public lastName: string;
    public email: string;
    public phones: string[];
    public shippingCity: string;
    public shippingAddress: string;

    public constructor(init?: Partial<ShippingInfo>) {
        Object.assign(this, init);
    }

    public customer(): string {
        return `${this.firstName} ${this.lastName}`;
    }

    get fullAddress(): string {
        return `${this.shippingCity} ${this.shippingAddress}`;
    }
}

export enum OrderType {
  Title = 'title',
  Price = 'price',
  Quantity = 'quantity'
}
