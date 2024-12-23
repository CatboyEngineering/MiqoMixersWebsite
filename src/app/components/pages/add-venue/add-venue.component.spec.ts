import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVenueComponent } from './add-venue.component';

describe('AddVenueComponent', () => {
  let component: AddVenueComponent;
  let fixture: ComponentFixture<AddVenueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddVenueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddVenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
