import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  template: `
    <app-product-card></app-product-card>
    <app-product-card></app-product-card>
    <div class="text-center">
      <button class="btn btn-lg btn-success">Checkout</button>
      or
      <a uiSref="home">continue shopping</a>
    </div>
  `,
  styles: []
})
export class CartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
