import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  template: `
    <nav class="navbar navbar-toggleable-md fixed-top">
      <a class="navbar-brand" href="#">Angular Academy e-commerce</a>

      <a class="nav-link" uiSref="login">Login</a>
      <a class="nav-link" uiSref="cart">Cart</a>
    </nav>
  `,
  styles: []
})
export class ToolbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
