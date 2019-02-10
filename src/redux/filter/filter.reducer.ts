import * as FilterActions from './filter.actions';

export function FilterReducer(state: FilterActions.Filter = 'all', action: FilterActions.SetFilterAction) {
  if (!action) {
    return state;
  }
  switch (action.type) {
    case FilterActions.SET_FILTER: {
      return action.filter;
    }
    default: {
      return state;
    }
  }
}
