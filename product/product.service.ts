import { IProduct } from './product.model';
import {Injectable} from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {tap} from 'rxjs/operators'

@Injectable({
    providedIn : 'root'
})
export class ProductService {
      
       private productUrl = "api/products";
       constructor(private http : HttpClient) {}
       getproducts() : Observable<IProduct[]>
      {
          return this.http.get<IProduct[]>(this.productUrl).pipe(
              tap(val => console.log(JSON.stringify(val)))
          );
      }
      
      getproductbyId(id : number): Observable<IProduct>
      {
           const urlobt = `${this.productUrl}/${id}`;
           return this.http.get<IProduct>(urlobt).pipe(
            tap(val => console.log("Obtained product is : ", JSON.stringify(val)))
        );
      }

      createproduct(prod : IProduct) : Observable<IProduct>
      {
          prod.id = null;
          return this.http.post<IProduct>(this.productUrl,prod).pipe(
              tap(val => console.log(""))
          )
      }

     public initialise_product(){
          return {
            "id" : 0, 
            "productName" : null, 
            "productCode" : null, 
            "releaseDate" : null,
            "price" : null,
            "description" : null,
            "imageURL" :  null, 
            "star_rating" : null
          }
      }
}