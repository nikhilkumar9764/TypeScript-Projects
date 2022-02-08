import { FormControl } from '@angular/forms';
import { Customer } from './customer.model';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
   
  customerForm : FormGroup;
  customer = new Customer();

  
  constructor() { }

  ngOnInit() {
    this.customerForm = new FormGroup({
      firstName : new FormControl(),
      lastName : new FormControl(),
      email : new FormControl(),
      sendCatalog : new FormControl()
    })
  }


  populateTestData() : void {
      this.customerForm.patchValue({
        firstName: "Jack",
        lastName : "Marquee",
        email : "jack234@gmail.com",
        sendCatalog : false
      })
  }

  save()
  {
    console.log(this.customerForm);
    console.log('Saved :' + JSON.stringify(this.customerForm.value));
  }
}
