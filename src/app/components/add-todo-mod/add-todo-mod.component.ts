import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/interfaces/user';
import { TodoService } from 'src/app/services/todos.service';
import { AssignedToModComponent } from '../assigned-to-mod/assigned-to-mod.component';

@Component({
  selector: 'app-add-todo-mod',
  templateUrl: './add-todo-mod.component.html',
  styleUrls: ['./add-todo-mod.component.css'],
})
export class AddTodoModComponent {
  public breakpoint: number = 0; // Breakpoint observer code
  public title: string = ``;
  wasFormChanged = false;
  public selectedUserName: string | null = null;
  private user: User | null = null;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private Srv: TodoService
  ) { }
  public formGroup = new FormGroup({
    Title: new FormControl(null, [Validators.required]),
    date: new FormControl(null),
  });
  public dateControl = new FormControl(new Date(2021, 9, 4, 5, 6, 7));

  public onAddTodo(): void {
    console.log('content added');
    if (this.formGroup.valid) {
      const formData = this.formGroup.value;
      console.log(formData, this.user?.id);
      this.Srv.addTodo(
        formData.Title ?? '',
        formData.date,
        this.user?.id
      ).subscribe(
        (response) => {
          console.log('Response: ', response);
          this.openDialog();
        },
        (error) => {
          console.log('Error: ', error);
        }
      );
    }
  }
  openDialog(): void {
    this.dialog.closeAll();
  }
  public onResize(event: any): void {
    this.breakpoint = event.target.innerWidth <= 600 ? 1 : 2;
  }
  formChanged() {
    this.wasFormChanged = true;
  }
  openUserModal() {
    const dialogRef = this.dialog.open(AssignedToModComponent);
    dialogRef.afterClosed().subscribe((selectedUser: User) => {
      console.log('SelectedUser_', selectedUser);
      if (selectedUser) {
        this.user = selectedUser;
        this.selectedUserName = selectedUser.fullName;
      } else {
        this.clearSelectedUser();
      }
    });
  }
  clearSelectedUser() {
    this.selectedUserName = null;
  }
}
