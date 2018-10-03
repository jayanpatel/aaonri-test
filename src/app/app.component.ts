import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  @HostListener("window:scroll", [])
  onWindowScroll() {
      var navbar = document.getElementById("transbg");
      var sticky = navbar.offsetTop;
      
      if (window.pageYOffset >= 10) {
        	navbar.classList.add("sticky")
        	navbar.classList.add("lightHeader");
       } 
      else {
        navbar.classList.remove("sticky");
        navbar.classList.remove("lightHeader");
      }
    }
  }
