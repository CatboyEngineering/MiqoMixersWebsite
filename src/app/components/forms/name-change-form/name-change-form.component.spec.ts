import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NameChangeFormComponent } from './name-change-form.component';

describe('NameChangeFormComponent', () => {
  let component: NameChangeFormComponent;
  let fixture: ComponentFixture<NameChangeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NameChangeFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NameChangeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
