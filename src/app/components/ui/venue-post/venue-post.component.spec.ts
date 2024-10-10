import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenuePostComponent } from './venue-post.component';

describe('VenuePostComponent', () => {
  let component: VenuePostComponent;
  let fixture: ComponentFixture<VenuePostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VenuePostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VenuePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
