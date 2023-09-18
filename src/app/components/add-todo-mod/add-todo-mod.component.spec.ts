import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTodoModComponent } from './add-todo-mod.component';

describe('AddTodoModComponent', () => {
  let component: AddTodoModComponent;
  let fixture: ComponentFixture<AddTodoModComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTodoModComponent]
    });
    fixture = TestBed.createComponent(AddTodoModComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
