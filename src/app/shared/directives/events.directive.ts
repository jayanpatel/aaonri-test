import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[app-events]'
})
export class EventsDirective {

  constructor() {
    
   }
    navbar:any = document.getElementById("transbg");
  @HostListener('window:scroll', ['$event'])
  track(event) {
    if (window.pageYOffset >= 10) {
      this.navbar.classList.add("sticky")
      this.navbar.classList.add("lightHeader");
      } else {
      this.navbar.classList.remove("sticky");
      this.navbar.classList.remove("lightHeader");
      }
  }
}
