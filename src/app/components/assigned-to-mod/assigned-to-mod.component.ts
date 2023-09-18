import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { MatDialogRef } from '@angular/material/dialog';
import { TodoService } from 'src/app/services/todos.service';

@Component({
  selector: 'app-assigned-to-mod',
  templateUrl: './assigned-to-mod.component.html',
  styleUrls: ['./assigned-to-mod.component.css'],
})
export class AssignedToModComponent implements OnInit {
  displayedColumns: string[] = ['actions'];
  dataSource: User[] = [];
  constructor(
    private dialogRef: MatDialogRef<AssignedToModComponent>,
    private todoService: TodoService
  ) { }

  assignUser(user: User) { this.dialogRef.close(user); }

  ngOnInit() {
    this.todoService.userList().subscribe((data: User[]) => {
      console.log(data);
      this.dataSource = data;
    });
  }
}
