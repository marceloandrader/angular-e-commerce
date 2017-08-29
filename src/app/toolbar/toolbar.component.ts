import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  template: `
    <nav class="navbar navbar-toggleable-lg">
      <a class="navbar-brand" href="#">Angular Academy e-commerce</a>

      <a class="nav-link float-right" uiSref="login">Login</a>
      <a class="nav-link float-right" uiSref="user-profile">Profile</a>
      <a class="nav-link float-right" uiSref="cart">Cart</a>
    </nav>
  `,
  styles: []
})
export class ToolbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
