import { Inject, Injectable } from "@angular/core";
import { InMemoryWebApiModule } from "angular-in-memory-web-api";
import { Product } from "./product.model";

@Injectable({
    providedIn : 'root'
})
export class ProductData implements InMemoryWebApiModule {
    createDb()
    {
        var products : Product[] = [
            {
                "id" : 101, 
                "productName" : "Lemon Grass", 
                "productCode" : "H1E-B67R", 
                "releaseDate" : "August 23 2021",
                "price" : 550.67 ,
                "description" : "Used in cooking",
                "imageURL" :  "assets/image1.jpg", 
                "star_rating" : 4.8
              },

              {
                "id" : 102, 
                "productName" : "Rose Mary", 
                "productCode" : "VB-C51W7", 
                "releaseDate" : "May 25 2021",
                "price" : 56.67 ,
                "description" : "Used in perfumes",
                "imageURL" :  "assets/image2.jpg", 
                "star_rating" : 3.6
              },
          
              {
                "id" : 103, 
                "productName" : "Tequila", 
                "productCode" : "ZX78-A45VY", 
                "releaseDate" : "September 23 2021",
                "price" : 35.24 ,
                "description" : "A medicinal herb",
                "imageURL" :  "assets/image3.jpg", 
                "star_rating" : 2.9
              }
        ]
       
        return  {products};
    }
}