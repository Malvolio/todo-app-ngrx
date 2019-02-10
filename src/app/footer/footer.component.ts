import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';

import { AppState } from './../../redux/app.reducer';
import * as FilterActions from './../../redux/filter/filter.actions';
import * as TodoActions from './../../redux/todo/todo.actions';
import { getStateCompleted } from './../../redux/todo/todo.selectors';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent {

  countTodos: number;
  currentFilter: FilterActions.Filter;
  showFooter: boolean;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute
  ) {
    this.readFilterState();
    this.readTodosState();
    this.readParams();
  }

  clearCompleted() {
    const action = new TodoActions.ClearCompletedAction();
    this.store.dispatch(action);
  }

  completedAll() {
    const action = new TodoActions.CompletedAllAction();
    this.store.dispatch(action);
  }

  private readTodosState() {
    this.store.select('todos')
    .subscribe(todos => {
      this.countTodos = todos.filter(t => !t.completed).length;
      this.showFooter = todos.length > 0;
    });
  }

  private readFilterState() {
    this.store.select('filter')
    .subscribe(filter => {
      this.currentFilter = filter;
    });
  }

  private readParams() {
    this.route.params
    .subscribe(params => {
      this.store.dispatch(new FilterActions.SetFilterAction(FilterActions.toFilter(params.filter)));
    });
  }

  readonly footerLinks = [
    {
      filter: 'all',
      label:  'All',
    },
    {
      filter: 'active',
      label:  'Active',
    },
    {
      filter: 'completed',
      label:  'Completed',
    },
  ];
}


