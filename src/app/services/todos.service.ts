import { Injectable } from '@angular/core';
import { Todos } from '../interfaces/todos';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { User } from '../interfaces/user';
import { omitBy, isNull } from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todosWithFilter: Todos[] = [];
  constructor(private http: HttpClient) {}

  list(showCompleted: boolean, showExpired: boolean): Observable<Todos[]> {
    console.log('List_Refreshed');
    return this.http
      .get<Todos[]>(`/api/todos/?showCompleted=${showCompleted}`)
      .pipe(
        map((todos: Todos[]) => {
          if (!showExpired) {
            return todos.filter((todo) => !todo.expired);
          }
          return todos;
        })
      );
  }

  count(showCompleted: boolean, showExpired: boolean): Observable<number> {
    console.log('Count_Refreshed');
    return this.list(showCompleted, showExpired).pipe(
      map((todos) => todos.length)
    );
  }

  userList(): Observable<User[]> {
    return this.http.get<User[]>('/api/users');
  }

  assignTo(todoId: string, userId: string): Observable<object> {
    return this.http.post(`/api/todos/${todoId}/assignTo`, {
      userId: userId,
    });
  }
  checkTodo(currentValue: boolean, todoId: string) {
    if (currentValue == true) {
      return this.http.patch(`/api/todos/${todoId}/check`, null);
    } else {
      return this.http.patch(`/api/todos/${todoId}/uncheck`, null);
    }
  }

  addTodo(title: string, dueDate?: Date | null, assignedTo?: string | null) {
    const data = { title, dueDate, assignedTo };
    const filteredData = omitBy(data, isNull);
    return this.http.post<Todos>('/api/todos', filteredData);
  }
}
