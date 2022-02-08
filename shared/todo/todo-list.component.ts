import { Product } from './product.model';
import { Category } from './category.model';
import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
 
  categories : Category[];
  products : Product[];
  form : FormGroup;
  constructor(private datservice : TodoService , private fb : FormBuilder) { }

  ngOnInit() {
       this.categories = this.datservice.fetchCategories();
       this.form = this.fb.group({
           categoryid : [],
           productid : []
       });
  }

  oncategorychange(event : any)
  {
      this.products = this.datservice.fetchProducts(event.value);
      this.form.patchValue({
        productid : null
      })
      console.log(this.products);
  }

  save()
  {
     console.log(this.form.value);
  }

}
