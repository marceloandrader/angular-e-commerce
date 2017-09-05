import {Component, OnDestroy, OnInit} from '@angular/core';
import * as fromRoot from '../reducers';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/map';
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-home',
  template: `
    <app-category-list *ngFor="let category of getCategories() | async"
                      [category]="category"></app-category-list>
  `,
  styles: []
})
export class HomeComponent implements OnInit, OnDestroy {

  private alive = true;

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() {
  }

  ngOnDestroy () {
    this.alive = false;
  }

  getCategories() {
    return this.store.select(fromRoot.getCategoriesWithProducts)
      .takeWhile(() => this.alive);
  }

}
