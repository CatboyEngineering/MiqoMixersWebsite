import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVenueComponent } from './edit-venue.component';

describe('EditVenueComponent', () => {
  let component: EditVenueComponent;
  let fixture: ComponentFixture<EditVenueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditVenueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditVenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
