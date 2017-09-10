import { Component, OnInit, OnDestroy } from '@angular/core';
import { category } from "../../models/category";
import * as fromRoot from '../../reducers';
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-admin-categories',
  template: `
  <table class="table">
  <thead>
  <tr>
    <th>ID</th>
    <th>Name</th>
  </tr>
  </thead>
  <tbody>
    <tr *ngFor="let category of getCategories()| async">
      <td>{{category.id}}</td>
      <td>{{category.name}}</td>
    </tr>
  </tbody>
  </table>
  `,
  styles: []
})
export class AdminCategoriesComponent implements OnInit, OnDestroy {

  private alive = true;
  public categories: Array<category>;

  constructor(private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.alive = false;
  }

  getCategories() {
    return this.store.select(fromRoot.getCategories)
      .takeWhile(() => this.alive);
  }

}
