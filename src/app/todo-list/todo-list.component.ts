import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AppState } from './../../redux/app.reducer';
import { Todo } from './../../redux/todo/todo.model';
import * as TodoActions from './../../redux/todo/todo.actions';
import { getVisibleTodos, getStateCompleted } from './../../redux/todo/todo.selectors';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html'
})
export class TodoListComponent {

  todos: Todo[] = [];
  checkField: FormControl;

  constructor(
    private store: Store<AppState>,
  ) {
    this.checkField = new FormControl();
    this.readStateCompleted();
    this.readTodosState();
  }

  toggleAll() {
    this.store.dispatch(new TodoActions.CompletedAllAction());
  }

  private readTodosState() {
    this.store.select(getVisibleTodos)
    .subscribe(todos => {
      this.todos = todos;
    });
  }

  private readStateCompleted() {
    this.store.select(getStateCompleted)
    .subscribe(status => {
      this.checkField.setValue(status);
    });
  }
}
