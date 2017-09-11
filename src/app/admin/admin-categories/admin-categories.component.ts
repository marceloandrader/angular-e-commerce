import { Component, OnInit, OnDestroy } from '@angular/core';
import { category } from "../../models/category";
import * as fromRoot from '../../reducers';
import {Store} from "@ngrx/store";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-admin-categories',
  template: `
  <h2>Manage Categories</h2>
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

  constructor(private store: Store<fromRoot.State>, fb: FormBuilder) {
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
