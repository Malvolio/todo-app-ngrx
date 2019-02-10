import { createSelector } from '@ngrx/store';
import { AppState } from './../app.reducer';
import { Todo } from './todo.model';
import { Filter } from './../filter/filter.actions';

export const getState  = (state: AppState) => state;
export const getFilter = (state: AppState) => state.filter;
export const getTodos  = (state: AppState) => state.todos;

export const getVisibleTodos = createSelector(
  getTodos,
  getFilter,
  (todos: Todo[], filter: Filter) => {
    switch (filter) {
      case 'all':
        return todos;
      case 'completed':
        return todos.filter(t => t.completed);
      case 'active':
        return todos.filter(t => !t.completed);
    }
  }
);

export const getStateCompleted = createSelector(getTodos, (todos) => {
  return todos.every(todo => todo.completed);
});
