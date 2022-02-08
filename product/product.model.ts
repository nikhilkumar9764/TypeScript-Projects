export interface IProduct {
    id : number, 
    productName : string, 
    productCode : string, 
    releaseDate? : string,
    price : number , 
    description? : string,
    imageURL? : string , 
    star_rating? : number
}

export class Product implements IProduct
{
    id: number;
    productName: string;
    productCode: string;
    releaseDate?: string;
    price: number;
    description?: string;
    imageURL?: string;
    star_rating?: number;
}