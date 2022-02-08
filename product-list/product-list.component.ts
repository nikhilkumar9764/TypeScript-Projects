import { ProductService } from './../product.service';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductRepository } from '../product-repository';
import { IProduct, Product } from '../product.model';
import { ProductGroupComponent } from './reactive-forms/product-form.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit{

  pageTitle : string = "PRODUCT TITLE";
  
  selectedItem : string = "";
  targetname : string = "Lemon Grass";
  targetname1 : string = "Rose Mary";
  showimage : boolean = false;
  _listfilter : string;

  filteredProducts : IProduct[];

  imagewidth : 60;
  imageheight : 3;
  repo : ProductRepository = new ProductRepository();
  
  @Input() public somedata : any;
  productList : IProduct[] = [];

  constructor(private productService : ProductService)
  {
      
  }
  ngOnInit(): void {
    this.productService.getproducts().subscribe({
      next:(pdts) =>{
        this.productList = pdts;
        this.filteredProducts = this.productList;
    }
  });
  console.log(this.somedata);
  }

  set listFilter(value: string)
  {
       this._listfilter = value;
       this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.productList;
  }
  

  get listFilter()
  {
      return this._listfilter;
  }

  performFilter(val : string) : IProduct[]
  {
     val = val.toLocaleLowerCase();
     return this.productList.filter((product)=> product.productName.toLocaleLowerCase().indexOf(val)!==-1);
  }

  
  getproducts() : IProduct[]
  {
    this.productList = this.repo.getall_products();
    return this.productList;
  }

  getproduct(id : number) : IProduct
  {
      return this.repo.getproduct_by_id(id);
  }


  getproduct_cnt() : number
  {
      return this.productList.length;
  }

  review : string;

  onstarclicked(msg:string) {
          this.review = msg;
  }
  
  

  newproduct : Product = new Product();

  
  formsubmitted :boolean = false;
  // submitform(form: NgForm)
  // {
  //   this.formsubmitted = true;
  //   if(form.valid)
  //   {
  //     this.addnewproduct(this.newproduct);
  //     this.newproduct = new Product();
  //     form.reset();
  //     this.formsubmitted = false;
  //   }
  // }

  // getvalidationmsg(state: any , thingName? : string)
  // {
  //      let thing = state.path || thingName;
  //      let message : string[] = [];
  //      if(state.errors)
  //      {
  //          for(let x in state.errors)
  //          {
  //              switch(x)
  //              {
  //                  case "required" : 
  //                     message.push(`You must enter a ${thing}`);
  //                     break;

  //                  case "minlength" : 
  //                     message.push(`The ${thing} must have a minimum of ${ state.errors['minlength'].requiredLength } characters `)
  //                     break;
                   
  //                  case "pattern" : 
  //                     message.push(`The ${thing} has illegal characters in it.`)
  //                     break;
  //              }
  //          }
  //      }
  //      return message;
  // }
  
  // getformvalidationmsg(form: NgForm) : string[]
  // {
  //      let summary : string[] = [];
  //       Object.keys(form.controls).forEach((k) => {
  //        this.getvalidationmsg(form.controls[k],k).forEach((m) =>{
  //          summary.push(m);
  //        })
  //      });

  //      return summary;
  // }
  
  // Method to display the validation messages 
  formGroup : ProductGroupComponent = new ProductGroupComponent();
  
  submitform()
  {
    if(this.formGroup.valid)
    {
      Object.keys(this.formGroup.controls).forEach((c) => 
      this.newproduct[c] = this.formGroup.controls[c].value);
    }
      this.formsubmitted = true;
      if(this.formGroup.valid)
      {
        this.addnewproduct(this.newproduct);
        this.formGroup.reset();
        this.formsubmitted = false;
      }
  }
  

  get jsonProduct()
  {
    return JSON.stringify(this.newproduct);
  }

  addnewproduct(p: Product)
  {
    console.log("New Product"+this.jsonProduct);
      this.repo.saveproduct(p);
  }


  // getaclass(key:number) : string
  // {
  //    let prod = this.repo.getproduct_by_id(key);
  //    return "p-2" + (prod.price > 100) ? "bg-info" : "bg-warning";
  // }

  // getclassmap(key: number):Object {
  //     let prod = this.repo.getproduct_by_id(key);
  //    return {
  //         "bg-info" : prod.price < 300,
  //         "bg-warning" : prod.price > 300
  //    }
  // }

  // getstyles(key:number): Object {
  //    let prod = this.repo.getproduct_by_id(key);
  //    return{
  //      fontSize : "30px",
  //      "margin.px" : 100,
  //      color : prod.price > 200 ? "red" : "green"
  //    }
  // }

  // fontsizewithunits : string = "30px";
  // fontsizewithoutunits : string = "100";
  
  getselected(item : IProduct) : boolean {
      return item.productName == this.selectedItem;
  }

  toggleimage() : void{
    this.showimage = !this.showimage;
  }
}
