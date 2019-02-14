import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Subject, ReplaySubject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { AppState } from './../../redux/app.reducer';
import * as FilterActions from './../../redux/filter/filter.actions';
import * as TodoActions from './../../redux/todo/todo.actions';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent implements OnInit, OnDestroy {

  readonly countTodos = this.store.select('todos').pipe(map(todos => todos.filter(t => !t.completed).length));
  readonly showFooter = this.store.select('todos').pipe(map(todos => todos.length > 0));
  readonly currentFilter = this.store.select('filter');
  readonly clearCompletedButton = new Subject<unknown>();
  
  constructor(
    private readonly store: Store<AppState>,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.readParams();

    this.clearCompletedButton.subscribe(() => {
      const action = new TodoActions.ClearCompletedAction();
      this.store.dispatch(action);
    });
  }

  private readonly onDestroy = new ReplaySubject<void>(1);

  ngOnDestroy() {
    this.onDestroy.next();
  }

  private readParams() {
    this.route.params.pipe(takeUntil(this.onDestroy))
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


