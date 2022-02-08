import { Attribute, Directive, ElementRef, Input, SimpleChange } from "@angular/core";


@Directive({
    selector : "[ps-attr]"
})

export class PsAttrDirective {

     @Input("ps-attr")
     bgClass : string;
     
     constructor(private element: ElementRef)
     {

     }
    //   constructor(element: ElementRef, @Attribute("ps-attr") bgClass : string)
    //   {
    //       element.nativeElement.classList.add(bgClass || "bg-success" , "text-white");
    //   }

    ngOnInit()
    {
        this.element.nativeElement.classList.add(this.bgClass || "bg-success" , "text-white");
    }

    ngOnChanges(changes : {[property : string] : SimpleChange})
    {
         let change = changes["bgClass"];
         let classList = this.element.nativeElement.classList;
         if(!change.isFirstChange() && classList.contains(change.previousValue))
         {
             classList.remove(change.previousValue);
         }
         if(!classList.contains(change.currentValue))
         {
             classList.add(change.currentValue);
         }
    }
}