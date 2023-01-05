import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePswdFormComponent } from './change-pswd-form.component';

describe('ChangePswdFormComponent', () => {
  let component: ChangePswdFormComponent;
  let fixture: ComponentFixture<ChangePswdFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangePswdFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangePswdFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
