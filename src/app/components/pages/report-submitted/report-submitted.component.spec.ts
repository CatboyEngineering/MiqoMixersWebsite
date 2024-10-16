import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportSubmittedComponent } from './report-submitted.component';

describe('ReportSubmittedComponent', () => {
  let component: ReportSubmittedComponent;
  let fixture: ComponentFixture<ReportSubmittedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportSubmittedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportSubmittedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
