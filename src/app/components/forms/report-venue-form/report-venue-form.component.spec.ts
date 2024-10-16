import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportVenueFormComponent } from './report-venue-form.component';

describe('ReportVenueFormComponent', () => {
  let component: ReportVenueFormComponent;
  let fixture: ComponentFixture<ReportVenueFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportVenueFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportVenueFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
