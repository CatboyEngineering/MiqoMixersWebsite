import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyCharacterComponent } from './verify-character.component';

describe('VerifyCharacterComponent', () => {
  let component: VerifyCharacterComponent;
  let fixture: ComponentFixture<VerifyCharacterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifyCharacterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerifyCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
