import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';

import { AppState } from './../../redux/app.reducer';
import { Todo } from './../../redux/todo/todo.model';
import * as TodoActions from './../../redux/todo/todo.actions';
import { getVisibleTodos, getStateCompleted } from './../../redux/todo/todo.selectors';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent {
  readonly complete = this.store.select(getStateCompleted);
  readonly todoList = this.store.select(getVisibleTodos);
  readonly toggleAll = new Subject<unknown>();
    
  constructor(
    private readonly store: Store<AppState>,
    private readonly route: ActivatedRoute
  ) {
    this.toggleAll.subscribe(() => {
      this.store.dispatch(new TodoActions.CompletedAllAction());
    });
  }
}
