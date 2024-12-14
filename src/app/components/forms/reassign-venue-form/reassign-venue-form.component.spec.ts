import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReassignVenueFormComponent } from './reassign-venue-form.component';

describe('ReassignVenueFormComponent', () => {
  let component: ReassignVenueFormComponent;
  let fixture: ComponentFixture<ReassignVenueFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReassignVenueFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReassignVenueFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
