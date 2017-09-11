import { Component, OnInit, OnDestroy } from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromRoot from '../reducers';

@Component({
  selector: 'app-admin',
  template: `
  <h1>Welcome to the management site</h1>
  <a class="list-group">
    <a class="list-group-item list-group-item-action" uiSref="admin-categories" *ngIf="isAdmin">Categories</a>
    <a class="list-group-item list-group-item-action" uiSref="admin-products" *ngIf="isAdmin || isManager">Products</a>
    <a class="list-group-item list-group-item-action" uiSref="admin-users" *ngIf="isAdmin">Users</a>
    
    <a class="list-group-item list-group-item-action" uiSref="admin-orders" *ngIf="isAdmin || isManager">Orders</a>
  </a>
  `,
  styles: []
})
export class AdminComponent implements OnInit {
  public isAdmin: boolean;
  public isManager: boolean;
  private alive: boolean = true;


  constructor(private store: Store<fromRoot.State>) {
    this.store.select(fromRoot.getCurrentUser)
      .takeWhile(() => this.alive)
      .subscribe((user) => {
        this.isAdmin = user.role === 'api_admin';
        this.isManager = user.role === 'api_manager';
      });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
