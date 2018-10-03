import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var slide = document.getElementById('slide');
    var slide1 = document.getElementById('slide1');
    var slide2 = document.getElementById('slide2');
    var slide3 = document.getElementById('slide3');
    var slide4 = document.getElementById('slide4');
    
  
  
  
    // if(slide.style.pos !=0 && 
    //   slide1.style.pos !=0 && 
    //   slide2.style.pos !=0 && 
    //   slide3.style.pos !=0 && 
    //   slide4.style.pos !=0)
    //   {
          slide.style.right = 50+'%';
          slide.style.bottom = 35+'%';
      
          slide1.style.right = 55+'%';
          slide1.style.bottom = 60+'%';
      
          slide2.style.right = 45+'%';
          slide2.style.bottom = 40+'%';
          
          slide3.style.right = -8+'%';
          slide3.style.bottom = 38+'%';
          
          slide4.style.right = 35+'%';
          slide4.style.bottom = 17+'%';
    // }
  }

}
