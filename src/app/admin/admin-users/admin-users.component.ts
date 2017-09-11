import { Component, OnInit, OnDestroy } from '@angular/core';
import { user } from "../../models/user";
import * as fromRoot from '../../reducers';
import {Store} from "@ngrx/store";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToasterService} from "angular2-toaster";
import * as data from '../../actions/data';

@Component({
  selector: 'app-admin-users',
  template: `
    <h2>Manage Users <a href="javascript:void(false);" (click)="newUser()">New User</a></h2>
    <form (submit)="saveUser()" *ngIf="showForm">
      <fieldset>
        <legend>New User</legend>
        <div class="form-group row required">
          <label class="col-form-label col-sm-2">Email:</label>
          <div class="col-sm-10">
            <input type="hidden" [formControl]="userForm.controls['id']">
            <input type="text" placeholder="Email" class="form-control" [formControl]="userForm.controls['email']">
          </div>
        </div>
        <div class="form-group row required">
          <label class="col-form-label col-sm-2">First Name:</label>
          <div class="col-sm-10">
            <input type="text" placeholder="First Name" class="form-control" [formControl]="userForm.controls['first_name']">
          </div>
        </div>
        <div class="form-group row required">
          <label class="col-form-label col-sm-2">Last Name:</label>
          <div class="col-sm-10">
            <input type="text" placeholder="Last Name" class="form-control" [formControl]="userForm.controls['last_name']">
          </div>
        </div>
        <div class="form-group row">
          <label class="col-form-label col-sm-2">Role:</label>
          <div class="col-sm-10">
            <select class="form-control"  [formControl]="userForm.controls['role']">
              <option value="{{role}}" *ngFor="let role of getRoles()">{{role}}</option>
            </select>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-form-label col-sm-2">Phone:</label>
          <div class="col-sm-10">
            <input type="text" placeholder="Phone" class="form-control" [formControl]="userForm.controls['phone']">
          </div>
        </div>
        <div class="form-group row">
          <label class="col-form-label col-sm-2">Password:</label>
          <div class="col-sm-10">
            <input type="password" placeholder="Password" class="form-control" [formControl]="userForm.controls['password']">
          </div>
        </div>
        <button class="btn btn-primary" type="submit">Save</button> or <a href="javascript:void(false);" (click)="cancelForm()">cancel</a>
      </fieldset>
    </form>
    <table class="table">
      <thead>
      <tr>
        <th>ID</th>
        <th>Email</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Phone</th>
        <th>Role</th>
        <th class="text-right" *ngIf="isAdmin">Delete</th>
      </tr>
      </thead>
      <tbody>
      <tr *ngFor="let user of getUsers()| async">
        <td><a href="javascript:void(false);" (click)="editUser(user)">{{user.id}}</a></td>
        <td>{{user.email}}</td>
        <td>{{user.first_name}}</td>
        <td>{{user.last_name}}</td>
        <td>{{user.phone}}</td>
        <td>{{user.role}}</td>
        <td class="text-right" *ngIf="isAdmin"><a href="javascript:void(false);" (click)="deleteUser(user)">Delete?</a></td>
      </tr>
      </tbody>
    </table>
  `,
  styles: []
})
export class AdminUsersComponent implements OnInit, OnDestroy {
  private alive = true;
  private waiting = false;
  public showForm: boolean = false;
  userForm: FormGroup;

  public isAdmin: boolean;
  public isManager: boolean;


  constructor(private store: Store<fromRoot.State>, fb: FormBuilder, private toasterService: ToasterService) {
    this.userForm = fb.group({
      'id': [null],
      'email': [null, Validators.compose([Validators.required, Validators.email])],
      'role': [null, Validators.compose([Validators.required])],
      'first_name': [null],
      'last_name': [null],
      'phone': [null],
      'password': [null],
    });

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

  getUsers() {
    return this.store.select(fromRoot.getUsers)
      .takeWhile(() => this.alive);
  }

  getRoles(){
    return ['user', 'manager', 'admin'];
  }

  newUser() {
    this.userForm.reset();
    this.showForm = true;
  }

  cancelForm() {
    this.showForm = false;
    this.userForm.reset();
  }

  editUser(user) {
    this.showForm = true;
    this.userForm.controls['id'].setValue(user.id);
    this.userForm.controls['email'].setValue(user.email);
    this.userForm.controls['role'].setValue(user.role);
    this.userForm.controls['first_name'].setValue(user.first_name);
    this.userForm.controls['last_name'].setValue(user.last_name);
    this.userForm.controls['phone'].setValue(user.phone);
    this.userForm.controls['password'].setValue('');
  }

  deleteUser(user) {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }
    this.store.dispatch(new data.DeleteUserAction(user));
    this.waiting = true;
    this.store.select(fromRoot.isSavedUser)
      .takeWhile(() => this.waiting)
      .subscribe((savedUser) => {
        if (savedUser) {
          this.toasterService.pop('success', 'User deleted', 'Successfully deleted user');
          this.store.dispatch(new data.LoadUsersAction({}));
          this.waiting = false;
        }
      });
  }

  saveUser() {
    if (!this.userForm.valid) {
      this.toasterService.pop('warning', 'Invalid Data', 'Please fill all the required fields');
      return;
    }
    this.store.dispatch(new data.SaveUserAction({
      id: this.userForm.controls['id'].value,
      email: this.userForm.controls['email'].value,
      first_name: this.userForm.controls['first_name'].value,
      last_name: this.userForm.controls['last_name'].value,
      role: this.userForm.controls['role'].value,
      phone: this.userForm.controls['phone'].value,
      password: this.userForm.controls['password'].value,
    }));
    this.waiting = true;
    this.store.select(fromRoot.isSavedUser)
      .takeWhile(() => this.waiting)
      .subscribe((savedUser) => {
        if (savedUser) {
          this.toasterService.pop('success', 'User saved', 'Successfully saved user');
          this.showForm = false;
          this.store.dispatch(new data.LoadUsersAction({}));
          this.waiting = false;
        }
      });
  }
}
