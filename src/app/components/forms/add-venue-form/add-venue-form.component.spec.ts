import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVenueFormComponent } from './add-venue-form.component';

describe('AddVenueFormComponent', () => {
  let component: AddVenueFormComponent;
  let fixture: ComponentFixture<AddVenueFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddVenueFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddVenueFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
