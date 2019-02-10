import { Action } from '@ngrx/store';

export const SET_FILTER  = '[SET] filter';

export type Filter = 'all' | 'completed' | 'active';

export function toFilter(v: string) : Filter {
  return ((v === 'completed') || (v === 'active')) ? v : 'all';
}

export class SetFilterAction implements Action {
  readonly type = SET_FILTER;

  constructor(
    public readonly filter: Filter
  ) {}
}
