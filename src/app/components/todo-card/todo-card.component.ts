import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todos } from 'src/app/interfaces/todos';
import { MatDialog } from '@angular/material/dialog';
import { AssignedToModComponent } from '../assigned-to-mod/assigned-to-mod.component';
import { User } from 'src/app/interfaces/user';
import { TodoService } from 'src/app/services/todos.service';
@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.css'],
  providers: [DatePipe],
})
export class TodosCardComponent {
  @Input() todo!: Todos;
  @Output() refreshList = new EventEmitter<void>();
  constructor(
    private datePipe: DatePipe,
    private dialog: MatDialog,
    private Srv: TodoService
  ) {}

  isDueDateClose(dueDateString: string | Date): boolean {
    const dueDate = new Date(dueDateString);
    if (isNaN(dueDate.getTime())) {
      throw new Error('Invalid date format');
    }
    const currentDate = new Date();
    const timeDifference = dueDate.getTime() - currentDate.getTime();
    const daysDifference = timeDifference / (1000 * 3600 * 24);
    return daysDifference <= 50;
  }

  openUserModal() {
    const dialogRef = this.dialog.open(AssignedToModComponent);
    dialogRef.afterClosed().subscribe((selectedUser: User) => {
      console.log('SelectedUser_', selectedUser);
      this.Srv.assignTo(this.todo.id!, selectedUser.id!).subscribe(
        (response) => {
          console.log('Response: ', response);
          this.refreshList.emit();
        },
        (error) => {
          console.log('Error: ', error);
        }
      );
    });
  }

  checkButton(event: any, id: string) {
    console.log('CheckUncheck_', event.checked);
    this.Srv.checkTodo(event.checked, id).subscribe(
      (response) => {
        console.log('Response: ', response);
        this.refreshList.emit();
      },
      (error) => {
        console.log('Error: ', error);
      }
    );
  }
}
