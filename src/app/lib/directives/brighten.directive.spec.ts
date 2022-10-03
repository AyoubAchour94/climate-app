import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HSLToRGB, tempToBrightness } from '../utils';
import { BrightenDirective } from './brighten.directive';


@Component({
  template: `
    <h2 id="" [appBrighten]=5></h2>
  `
})
class HostComponent {}


describe('BrightenDirective', () => {
  let fixture: any
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ HostComponent, BrightenDirective ]
    })
    .createComponent(HostComponent);
    fixture.detectChanges(); // initial binding
  });
  
  it('should have linear-gradient background that depend on Temperature `5`', () => {
    const h2: HTMLElement = fixture.nativeElement.querySelector('h2');
    const bgColor = h2.style.background;
    const color1 = HSLToRGB(194, tempToBrightness(5), 60)
    const color2 = HSLToRGB(153, tempToBrightness(5), 80)
    expect(bgColor).toBe(`linear-gradient(${color1}, ${color2})`);
  });
});
