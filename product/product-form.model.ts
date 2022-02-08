import { FormControl, FormGroup, Validators } from "@angular/forms";

export class ProductFormComponent extends FormControl{
      label: string;
      modelProperty : string;

      constructor(label : string, property : string, value : any, validator : any)
      {
            super(label ,validator);
            this.label = label;
            this.modelProperty = property;
      }

      getvalidationmsg()
      {
            let message : string[] = [];
            if(this.errors)
            {
                for(let x in this.errors)
               {
                 switch(x)
                 {
                    case "required" : 
                        message.push(`You must enter a ${this.label}`);
                        break;

                    case "minlength" : 
                        message.push(`The ${this.label} must have a minimum of ${ this.errors['minlength'].requiredLength } characters `)
                        break;

                    case "maxlength" : 
                        message.push(`The ${this.label} must have no more than ${ this.errors['maxlength'].requiredLength } characters `)
                        break;
                   
                    case "pattern" : 
                        message.push(`The ${this.label} has illegal characters in it.`)
                        break;
                 }
               }
            }
            return message;
      }
}

export class ProductGroupComponent extends FormGroup{
     constructor()
     {
         super({
            productName : new ProductFormComponent("Product Name" , "productName", "", Validators.compose([
                 Validators.required,Validators.pattern("^[a-zA-Z ]+$")])),

                 productCode : new ProductFormComponent("Product Code","productCode","",Validators.compose([
                 Validators.required,Validators.pattern("^[a-zA-Z ]+$"),Validators.minLength(3),Validators.maxLength(10)
             ])
             ),

             price : new ProductFormComponent("Price","price","",Validators.compose([
                Validators.required,Validators.pattern("^[0-9\.]+$")])
            )
         });
     }

     get productControls() : ProductFormComponent[]
     {
         return Object.keys(this.controls).map((k) => this.controls[k] as ProductFormComponent);
     }

     getvalidationmsg(val :string) :string[]
     {
          return (this.controls[val] as ProductFormComponent).getvalidationmsg();
     }

     getFormValidationmsg() : string[]
     {
         let summary : string[] = [];
         Object.values(this.controls).forEach((c)=> 
          summary.push(...(c as ProductFormComponent).getvalidationmsg()))
         return summary;
     }
}