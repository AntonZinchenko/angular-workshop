import {Product} from './product';
import {ShippingInfo} from './shipping-info';

export class Order {
    public id: number;

    public notes: string;

    public created: Date;
    public completed: boolean;

    constructor(
        public products: Product[],
        public shippingInfo: ShippingInfo
    ) {
        this.created = new Date();
        this.completed = false;
    }
}
