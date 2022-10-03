import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';

import { UiSlideComponent } from './ui-slide.component';

describe('UiSlideComponent', () => {
  let component: UiSlideComponent;
  let fixture: ComponentFixture<UiSlideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiSlideComponent ],
      imports: [
        StoreModule.forRoot({}),
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UiSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
