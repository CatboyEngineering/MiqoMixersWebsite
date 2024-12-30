import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedVenuesComponent } from './saved-venues.component';

describe('SavedVenuesComponent', () => {
  let component: SavedVenuesComponent;
  let fixture: ComponentFixture<SavedVenuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavedVenuesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SavedVenuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
