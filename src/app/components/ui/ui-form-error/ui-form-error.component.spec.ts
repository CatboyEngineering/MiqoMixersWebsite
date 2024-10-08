import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiFormErrorComponent } from './ui-form-error.component';

describe('UiFormErrorComponent', () => {
  let component: UiFormErrorComponent;
  let fixture: ComponentFixture<UiFormErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiFormErrorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UiFormErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
