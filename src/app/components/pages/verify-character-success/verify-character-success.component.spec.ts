import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyCharacterSuccessComponent } from './verify-character-success.component';

describe('VerifyCharacterSuccessComponent', () => {
  let component: VerifyCharacterSuccessComponent;
  let fixture: ComponentFixture<VerifyCharacterSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifyCharacterSuccessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerifyCharacterSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
