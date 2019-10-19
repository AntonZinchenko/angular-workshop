export class Product {
  constructor(
    public id: number,
    public title: string,
    public author: string,
    public published: Date,
    public desc: string,
    public price: number,
    public isAvailable: boolean,
    public rating: number,
    public url: string
  ) { }
}

export class ProductGroup {
  constructor(
    public key: string,
    public items: Product[]
  ) { }

  get quantity(): number {
    return this.items && this.items.length ? this.items.length : 0;
  }

  get product(): Product {
    return this.quantity ? this.items[0] : undefined;
  }

  get price(): number {
    return this.quantity ? this.items[0].price : undefined;
  }
}
