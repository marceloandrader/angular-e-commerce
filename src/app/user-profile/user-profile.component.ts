import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  template: `
    <form>
    <div class="row">
      <div class="col-md-4 offset-md-4">
        <fieldset><legend>Billing Address</legend>
          <app-address></app-address>
        </fieldset>
        <fieldset><legend>Shipping Address</legend>
          <app-address></app-address>
        </fieldset>
        <div class="text-center">
          <button class="btn btn-primary">Save Profile</button>
        </div>
      </div>
    </div>
      
    </form>
  `,
  styles: []
})
export class UserProfileComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
