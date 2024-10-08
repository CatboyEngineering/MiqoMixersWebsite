import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateShellsFormComponent } from './update-shells-form.component';

describe('UpdateShellsFormComponent', () => {
  let component: UpdateShellsFormComponent;
  let fixture: ComponentFixture<UpdateShellsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateShellsFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateShellsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
