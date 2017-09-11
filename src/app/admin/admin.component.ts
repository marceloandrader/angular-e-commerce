import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  template: `
  <h1>Welcome to the management site</h1>
  <a class="list-group">
    <a class="list-group-item list-group-item-action" uiSref="admin-categories">Categories</a>
    <a class="list-group-item list-group-item-action" uiSref="admin-products">Products</a>
    <a class="list-group-item list-group-item-action" uiSref="admin-users">Users</a>
    
    <a class="list-group-item list-group-item-action" uiSref="admin-users">Orders</a>
  </a>
  `,
  styles: []
})
export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
