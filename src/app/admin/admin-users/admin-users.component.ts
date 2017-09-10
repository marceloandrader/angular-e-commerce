import { Component, OnInit, OnDestroy } from '@angular/core';
import { user } from "../../models/user";
import * as fromRoot from '../../reducers';
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-admin-users',
  template: `
  <table class="table">
  <thead>
  <tr>
    <th>ID</th>
    <th>Email</th>
    <th>First Name</th>
    <th>Last Name</th>
    <th>Phone</th>
    <th>Role</th>
  </tr>
  </thead>
  <tbody>
    <tr *ngFor="let user of getUsers()| async">
      <td>{{user.id}}</td>
      <td>{{user.email}}</td>
      <td>{{user.first_name}}</td>
      <td>{{user.last_name}}</td>
      <td>{{user.phone}}</td>
      <td>{{user.role}}</td>
    </tr>
  </tbody>
  </table>
  `,
  styles: []
})
export class AdminUsersComponent implements OnInit, OnDestroy {

  private alive = true;
  public users: Array<user>;

  constructor(private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.alive = false;
  }

  getUsers() {
    return this.store.select(fromRoot.getUsers)
      .takeWhile(() => this.alive);
  }
}
