import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';

import { UiAutocompleteComponent } from './ui-autocomplete.component';

describe('UiAutocompleteComponent', () => {
  let component: UiAutocompleteComponent;
  let fixture: ComponentFixture<UiAutocompleteComponent>;

  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({}),
      ],
      declarations: [ UiAutocompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UiAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a different test title', () => {
    const input = fixture.nativeElement.querySelector('input');
    input.value = 'paris'
    input.dispatchEvent(new Event('input'));
    expect(component.query).toContain('paris');
  });
});
