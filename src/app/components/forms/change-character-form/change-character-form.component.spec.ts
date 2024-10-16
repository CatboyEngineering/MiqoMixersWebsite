import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeCharacterFormComponent } from './change-character-form.component';

describe('NameChangeFormComponent', () => {
  let component: ChangeCharacterFormComponent;
  let fixture: ComponentFixture<ChangeCharacterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeCharacterFormComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeCharacterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
