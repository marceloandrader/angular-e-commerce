import { Component } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import * as fromRoot from './reducers';
import * as data from './actions/data';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
    <app-toolbar></app-toolbar>
    <app-searchbar></app-searchbar>
    <toaster-container></toaster-container>
    <ui-view></ui-view>
    <app-footer></app-footer>
    </div>
  `,
  styles: [],
})
export class AppComponent {

  constructor(private store: Store<fromRoot.State>) {
     //this.store.dispatch(new data.RefreshTokenAction({}));
  }
}
