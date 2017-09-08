import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import * as fromRoot from '../reducers';
import * as data from '../actions/data';
import {ToasterService} from "angular2-toaster";
import {StateService} from "@uirouter/angular/lib";

@Component({
  selector: 'app-login',
  template: `
    <div class="row">
      <div class="col-md-4 offset-md-4">
        <form (submit)="processLogin()">
          <div class="form-group">
            <label for="email">Email address</label>
            <input type="email" class="form-control" id="email" [formControl]="loginForm.controls['email']" aria-describedby="emailHelp" placeholder="Enter email">
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="password" [formControl]="loginForm.controls['pass']" placeholder="Password">
          </div>
          <button type="submit" class="btn btn-primary">Sign In</button> or <a uiSref="signup">Sign up</a>
        </form>
      </div>
    </div>
  `,
  styles: []
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  private waiting: boolean = true;

  constructor(private store: Store<fromRoot.State>, fb: FormBuilder, private state: StateService, private toasterService: ToasterService) {
    this.loginForm = fb.group({
      'email': [null, Validators.compose([Validators.required, Validators.email])],
      'pass': [null, Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {
  }

  processLogin() {
    if (this.loginForm.valid) {
      this.login(
        this.loginForm.controls['email'].value,
        this.loginForm.controls['pass'].value);
    }
  }

  login(email, pass) {
    this.store.dispatch(new data.LoginAction({email, pass}));
    this.waiting = true;
    this.store.select(fromRoot.getCurrentUser)
      .takeWhile(() => this.waiting)
      .subscribe((newUser) => {
        if (newUser) {
          this.toasterService.pop('success', 'Successfully logged in', 'Redirecting...');
          this.state.go('home');
          this.waiting = false;
        }
      })
  }
}
