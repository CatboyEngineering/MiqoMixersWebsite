import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiFormFieldErrorComponent } from './ui-form-field-error.component';

describe('UiFormFieldErrorComponent', () => {
  let component: UiFormFieldErrorComponent;
  let fixture: ComponentFixture<UiFormFieldErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiFormFieldErrorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UiFormFieldErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
