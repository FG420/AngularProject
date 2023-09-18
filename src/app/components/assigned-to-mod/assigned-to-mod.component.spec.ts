import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedToModComponent } from './assigned-to-mod.component';

describe('AssignedToModalComponent', () => {
  let component: AssignedToModComponent;
  let fixture: ComponentFixture<AssignedToModComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignedToModComponent]
    });
    fixture = TestBed.createComponent(AssignedToModComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
