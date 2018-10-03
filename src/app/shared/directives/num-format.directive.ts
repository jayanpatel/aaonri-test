import { Directive,ElementRef } from '@angular/core';

@Directive({
  selector: '[num-format]',
  host: {'(ngModelChange)': 'doSomething($event)'}
})

export class NumFormatDirective {

  constructor(public _el:ElementRef) { }
  doSomething(event){
    var a;
    //a = this._el.nativeElement.value.replace(/^(\d{3})(\d{3})(\d{4})$/)
    var cleaned = ("" + this._el.nativeElement.value).replace(/\D/g, '');
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if(match){
    a = match[1] + "-" + match[2] + "-" + match[3];
    this._el.nativeElement.value = a;
    console.log(a );
    }
  }  

}
