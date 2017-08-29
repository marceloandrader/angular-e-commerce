import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  template: `
    Carousel
    <br>
    Name
    <br>
    Description
    <br>
    Price
    <br>
    <a uiSref="cart" class="btn btn-primary">Add to Cart</a>
  `,
  styles: []
})
export class ProductComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
