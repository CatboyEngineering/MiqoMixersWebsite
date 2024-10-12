import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueInfoFormComponent } from './venue-info-form.component';

describe('VenueInfoFormComponent', () => {
  let component: VenueInfoFormComponent;
  let fixture: ComponentFixture<VenueInfoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VenueInfoFormComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(VenueInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
