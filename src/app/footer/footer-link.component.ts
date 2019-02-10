import { Component, Input } from '@angular/core';
import { Filter } from './../../redux/filter/filter.actions';

@Component({
  selector: 'app-footer-link',
  templateUrl: './footer-link.component.html'
})
export class FooterLinkComponent {
  @Input() label: string;
  @Input() filter: Filter;
  @Input() currentFilter: Filter;
}
