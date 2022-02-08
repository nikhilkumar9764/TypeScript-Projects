import {Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
     selector : 'app-star',
     templateUrl : './star.component.html'
})

export class StarComponent {
      starwidth = 45;
      @Input() 
      rating : number;

     @Input()
      name_prod : string

      @Output()
      ratingClicked : EventEmitter<string> = new EventEmitter<string>();
     

      ngOnChanges()
      {
           this.starwidth = (this.rating*75)/5;
      }

      rating_changes():void {
           this.ratingClicked.emit(`The product with name ${this.name_prod} and rating ${this.rating} was clicked!!`);
      }
}