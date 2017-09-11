import {Component, OnDestroy, OnInit} from '@angular/core';
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
      <a class="navbar-brand" uiSrefActive="active" uiSref="home">Angular Academy e-commerce</a>

      <ul class="nav">
        <li class="nav-item">
          <a class="nav-link" uiSrefActive="active" uiSref="user-profile" *ngIf="loggedIn">Welcome back, {{name}}!</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" uiSrefActive="active" uiSref="my-orders" *ngIf="loggedIn">My Orders</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" uiSrefActive="active" uiSref="cart">Your current Cart</a>
        </li>
        <li *ngIf="loggedIn && isAdmin">
          <a class="nav-link" uiSrefActive="active" uiSref="admin">Manage the Site</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" uiSrefActive="active" uiSref="login" *ngIf="!loggedIn">Sign In</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="javascript:void(false);" *ngIf="loggedIn" (click)="logout()">Sign out</a>
        </li>
      </ul>
    </nav>
  `,
  styles: []
})
export class ToolbarComponent implements OnInit, OnDestroy {

  public loggedIn: boolean;
  public isAdmin: boolean;
  private alive: boolean = true;
  public name: string;
  private waiting: boolean = true;

  constructor(private store: Store<fromRoot.State>, private state: StateService, private toasterService: ToasterService) {
    this.store.select(fromRoot.getCurrentUser)
      .takeWhile(() => this.alive)
      .subscribe((user) => {
      this.loggedIn = !isUndefined(user);
      if (this.loggedIn) {
        this.name = user.email;
        this.isAdmin = user.role !== 'api_user';
      }
    });
  }

  ngOnInit() {
  }

  ngOnDestroy () {
    this.alive = false;
  }

  logout() {
    this.store.dispatch(new data.LogoutAction({}));
    this.waiting = true;
    this.store.select(fromRoot.getCurrentUser)
      .takeWhile(() => this.alive)
      .takeWhile(() => this.waiting)
      .subscribe((newUser) => {
        if (!newUser) {
          this.toasterService.pop('success', 'Successfully logged out', 'Redirecting...');
          this.state.go('home');
          this.waiting = false;
        }
      });
  }

}
