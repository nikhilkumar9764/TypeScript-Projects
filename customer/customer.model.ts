export class Customer {
    constructor(public firstName : string = '',
        public lastName : string = '',
        public email : string = '', 
        public sendCatalog : boolean = false,
        public state?: string
        )
    {

    }
}