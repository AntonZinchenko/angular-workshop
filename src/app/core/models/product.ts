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
