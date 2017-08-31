import {Component, Input, OnInit} from '@angular/core';
import {product} from "../../models/product";

@Component({
  selector: 'app-product-card',
  template: `
    <div class="product-card card">
      <div class="card-block">
        <img src="http://lorempixel.com/120/120" class="rounded float-left mr-4" alt="Product picture">
        <h4 class="card-title">{{product.name}}</h4>
        <h6 class="card-subtitle mb-2 text-muted">Price: {{product.price}}USD</h6>
        <p class="card-text">{{product.description}}</p>
        <a uiSref="cart" class="float-right btn btn-primary">Add to Cart</a>
        <a uiSref="product" class="card-link">View more</a>
      </div>
    </div>
  `,
  styles: [
    '.product-card {margin-bottom: 0.50rem; padding: 0.8rem;}'
  ]
})
export class ProductCardComponent implements OnInit {
  @Input() product: product;

  constructor() { }

  ngOnInit() {
  }

}
