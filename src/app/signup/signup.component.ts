import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  template: `
    <div class="row">
      <div class="col-md-4 offset-md-4">
        <form>
          <div class="form-group">
            <label for="email">Email address</label>
            <input type="email" class="form-control" id="email" placeholder="Enter email">
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="password" placeholder="Password">
          </div>
          <div class="row">
            <div class="col">
              <div class="form-group">
                <label for="first">First Name</label>
                <input type="text" class="form-control" id="first" placeholder="First">
              </div>
            </div>
            <div class="col">
              <div class="form-group">
                <label for="last">Last Name</label>
                <input type="text" class="form-control" id="last" placeholder="Last">
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="phone">Phone</label>
            <input type="text" class="form-control" id="phone" placeholder="Phone">
          </div>
          <button type="submit" class="btn btn-primary">Register</button>
        </form>
      </div>
    </div>
  `,
  styles: []
})
export class SignupComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
