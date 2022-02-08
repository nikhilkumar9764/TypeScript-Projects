import { Component, OnInit } from '@angular/core';
import { IProduct } from './product.model';

export class ProductRepository {

 
  private products : IProduct[] = [
      {
        id : 101, 
        productName : "Lemon Grass", 
        productCode : "H1E-B67R", 
        releaseDate : "August 23 2021",
        price : 550.67 ,
        imageURL :  "assets/image1.jpg", 
        star_rating : 4.8
      },


      {
        id : 102, 
        productName : "Rose Mary", 
        productCode : "VB-C51W7", 
        releaseDate : "May 25 2021",
        price : 56.67 ,
        imageURL :  "assets/image2.jpg", 
        star_rating : 3.6
      },

      {
        id : 103, 
        productName : "Tequila", 
        productCode : "ZX78", 
        releaseDate : "September 23 2021",
        price : 35.24 ,
        imageURL :  "assets/image3.jpg", 
        star_rating : 2.9
      }
]

  msg: string = "Enter the product name";
  
  getall_products() : IProduct[] 
  {
    return this.products;
  }
  
  private locator = (product : IProduct , pid : number) => product.id === pid;

  getclasses() : string
  {
      return this.products.length > 2 ? "bg-success" : "bg-warning";
  }
  
  getproduct_by_id(pid: number) : IProduct
  {
      let myres =  this.products.find((p) => this.locator(p,pid));
      if(myres!=null)
      {
         return myres;
      }
  }

  saveproduct(prod : IProduct)
  {
     console.log(this.products);
     if(prod.id === 0 || prod.id === null || prod.id === undefined)
      {
         prod.id = this.generateID();
         this.products.push(prod);
      }
      else{
          let idx = this.products.findIndex((p) => this.locator(prod,p.id));
          this.products.splice(idx,1,prod);
      }
  }

  private generateID(): number 
  {
       let val = 101;
       while(this.getproduct_by_id(val)!=null)
       {
           val++;
       }
       return val;
  }
   
}
