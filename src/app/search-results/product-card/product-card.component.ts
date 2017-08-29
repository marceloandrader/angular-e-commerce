import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-card',
  template: `
    <div class="product-card card">
      <div class="card-block">
        <img src="http://lorempixel.com/120/120" class="rounded float-left mr-4" alt="Product picture">
        <h4 class="card-title">Product title</h4>
        <h6 class="card-subtitle mb-2 text-muted">Price: 129USD</h6>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <a href="#" class="float-right btn btn-primary">Add to Cart</a>
        <a href="#" class="card-link">View more</a>
      </div>
    </div>
  `,
  styles: [
    '.product-card {margin-bottom: 0.50rem; padding: 0.8rem;}'
  ]
})
export class ProductCardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
