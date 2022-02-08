import { Injectable } from "@angular/core";
import { Category } from "./category.model";
import { Product } from "./product.model";



  @Injectable(
  {
    providedIn : 'root'
  })

  export class TodoService {
        
    public categories: Category[] = [
        { id: 1, name: 'Fruit' },
        { id: 2, name: 'Vegetables' },
        { id: 3, name: 'Nut' }
      ];
      public products: Product[] = [
        { id: 1, name: 'Grapes', categoryId: 1 },
        { id: 2, name: 'Apples', categoryId: 1 },
        { id: 3, name: 'Lemons', categoryId: 1 },
        { id: 4, name: 'Bananas', categoryId: 1 },
        { id: 5, name: 'Mangoes', categoryId: 1 },
        { id: 6, name: 'Beets', categoryId: 2 },
        { id: 7, name: 'Cabbage', categoryId: 2 },
        { id: 8, name: 'Carrot', categoryId: 2 },
        { id: 9, name: 'Onions', categoryId: 2 },
        { id: 10, name: 'Peanuts', categoryId: 3 },
        { id: 11, name: 'Walnuts', categoryId: 3 },
        { id: 12, name: 'Almonds', categoryId: 3 }
      ];

    constructor()
    {

    }

    fetchCategories() {
        return this.categories;
    }
    
    fetchProducts(catid)
    {
        return this.products.filter((p) =>  (p.categoryId === catid));
    }

  }