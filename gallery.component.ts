import { Component, OnInit } from '@angular/core';

@Component({
    selector : 'app-gallery',
    templateUrl : 'gallery.component.html',
    styleUrls : ['gallery.component.css']
})


export class GalleryComponent implements OnInit {

    pictures : string[] = [];
    constructor()
    {

    }
    ngOnInit()
     {
           this.pictures = new Array(5).fill(0).map(this.generate_image);
     }
 
     generate_image(){
        return 'https://picsum.photos/200/300'
     }
}