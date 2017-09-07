import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromRoot from '../reducers';
import * as data from '../actions/data';
import {isUndefined} from "util";
import {ToasterService} from "angular2-toaster/src/toaster.service";
import {StateService} from "@uirouter/angular/lib";

@Component({
  selector: 'app-toolbar',
  template: `
    <nav class="navbar navbar-toggleable-lg">
      <a class="navbar-brand" href="#">Angular Academy e-commerce</a>
      
      <span *ngIf="loggedIn">Welcome back, {{name}}!</span>
      
      <a class="nav-link float-right" uiSref="login" *ngIf="!loggedIn">Login</a>
      <a class="nav-link float-right" uiSref="user-profile" *ngIf="loggedIn">Profile</a>
      <a class="nav-link float-right" uiSref="my-orders" *ngIf="loggedIn">My Orders</a>
      <a class="nav-link float-right" uiSref="cart">Cart</a>

      <a class="nav-link float-right" href="javascript:void(false);" *ngIf="loggedIn" (click)="logout()">Sign out</a>
    </nav>
  `,
  styles: []
})
export class ToolbarComponent implements OnInit {

  public loggedIn: boolean;
  public name: string;

  constructor(private store: Store<fromRoot.State>, private state: StateService, private toasterService: ToasterService) {
    this.store.select(fromRoot.getCurrentUser).subscribe((user) => {
      this.loggedIn = !isUndefined(user);
      if (this.loggedIn) {
        this.name = user.email;
      }
    });
  }

  ngOnInit() {
  }

  logout() {
    this.store.dispatch(new data.LogoutAction({}));
    this.store.select(fromRoot.getCurrentUser)
      .subscribe((newUser) => {
        if (!newUser) {
          this.toasterService.pop('success', 'Successfully logged out', 'Redirecting...');
          this.state.go('home');
        }
      });
  }

}
