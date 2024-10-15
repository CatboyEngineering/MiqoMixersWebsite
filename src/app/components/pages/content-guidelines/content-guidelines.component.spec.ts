import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentGuidelinesComponent } from './content-guidelines.component';

describe('ContentGuidelinesComponent', () => {
  let component: ContentGuidelinesComponent;
  let fixture: ComponentFixture<ContentGuidelinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentGuidelinesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContentGuidelinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
