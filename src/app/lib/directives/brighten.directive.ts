import { Directive, ElementRef, Input, OnChanges } from '@angular/core';
import { tempToBrightness } from '../utils';

@Directive({
  selector: '[appBrighten]'
})
export class BrightenDirective implements OnChanges {

  @Input('appBrighten')
  temperature: number | undefined = 0;

  constructor(private el: ElementRef) { }
  //Applying dynamic background depending on the temperature
  ngOnChanges(): void {
    const brightness = tempToBrightness(this.temperature || 0)
    this.el.nativeElement.style.background = `linear-gradient(hsl(194, ${brightness}%, 60%), hsl(153, ${brightness}%, 80%))`;
  }

}
