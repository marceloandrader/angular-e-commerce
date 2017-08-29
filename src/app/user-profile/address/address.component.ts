import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-address',
  template: `
    <div class="form-group">
      <label for="name">Full Name</label>
      <input type="text" class="form-control" id="name" placeholder="First Last names">
    </div>
    <div class="form-group">
      <label for="address1">Address Line 1</label>
      <input type="text" class="form-control" id="address1" placeholder="Street, Number, Apt.">
    </div>
    <div class="form-group">
      <label for="address2">Address Line 2</label>
      <input type="text" class="form-control" id="address2" placeholder="Intersection">
    </div>
    <div class="row">
      <div class="col">
        <div class="form-group">
          <label for="city">City</label>
          <input type="text" class="form-control" id="city" placeholder="city">
        </div>    
      </div>
      <div class="col">
        <div class="form-group">
          <label for="state">State</label>
          <input type="text" class="form-control" id="state" placeholder="state">
        </div>
      </div>
      <div class="col">
        <div class="form-group">
          <label for="zip">Postal code</label>
          <input type="text" class="form-control" id="zip" placeholder="Postal code or ZIP">
        </div>    
      </div>
    </div>    
    <div class="form-group">
      <label for="phone">Phone</label>
      <input type="text" class="form-control" id="phone" placeholder="Phone">
    </div>
  `,
  styles: []
})
export class AddressComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
