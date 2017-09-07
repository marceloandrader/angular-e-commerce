import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import * as fromRoot from '../reducers';
import * as data from '../actions/data';
import {ToasterService} from "angular2-toaster";
import {StateService} from "@uirouter/angular/lib";

@Component({
  selector: 'app-signup',
  template: `
    <div class="row">
      <div class="col-md-4 offset-md-4">
        <form (submit)="processSignup()">
          <div class="form-group">
            <label for="email">Email address</label>
            <input type="email" [formControl]="signupForm.controls['email']" class="form-control" id="email" placeholder="Enter email">
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" [formControl]="signupForm.controls['pass']" class="form-control" id="password" placeholder="Password">
          </div>
          <div class="form-group">
            <label for="confirm_password">Confirm Password</label>
            <input type="password" [formControl]="signupForm.controls['pass_confirm']" class="form-control" id="confirm_password" placeholder="Repeat Password">
          </div>
          <div class="row">
            <div class="col">
              <div class="form-group">
                <label for="first">First Name</label>
                <input type="text" [formControl]="signupForm.controls['first']" class="form-control" id="first" placeholder="First">
              </div>
            </div>
            <div class="col">
              <div class="form-group">
                <label for="last">Last Name</label>
                <input type="text" [formControl]="signupForm.controls['last']" class="form-control" id="last" placeholder="Last">
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="phone">Phone</label>
            <input type="text" [formControl]="signupForm.controls['phone']" class="form-control" id="phone" placeholder="Phone">
          </div>
          <button type="submit" class="btn btn-primary">Register</button>
        </form>
      </div>
    </div>
  `,
  styles: []
})
export class SignupComponent implements OnInit {


  signupForm: FormGroup;

  constructor(private store: Store<fromRoot.State>, fb: FormBuilder, private state: StateService, private toasterService: ToasterService) {
    this.signupForm = fb.group({
      'email': [null, Validators.compose([Validators.required, Validators.email])],
      'pass': [null, Validators.compose([Validators.required])],
      'pass_confirm': [null, Validators.compose([Validators.required])],
      'first': [null, Validators.compose([Validators.required])],
      'last': [null, Validators.compose([Validators.required])],
      'phone': [null, Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {
  }

  processSignup() {
    if (this.signupForm.valid &&
      this.signupForm.controls['pass'].value === this.signupForm.controls['pass_confirm'].value) {
      this.signup(
        this.signupForm.controls['email'].value,
        this.signupForm.controls['pass'].value,
        this.signupForm.controls['first'].value,
        this.signupForm.controls['last'].value,
        this.signupForm.controls['phone'].value
      );
    } else {
      this.toasterService.pop('error', 'Invalid form', 'Please review that all data is filled and password match');
    }
  }

  signup(email, pass, first, last, phone) {
    this.store.dispatch(new data.SignupAction({email, pass, first, last, phone}));
    this.store.select(fromRoot.getCurrentUser)
      .subscribe((newUser) => {
        if (newUser) {
          this.toasterService.pop('success', 'Successfully logged in', 'Redirecting...');
          this.state.go('home');
        }
      })
  }
}
