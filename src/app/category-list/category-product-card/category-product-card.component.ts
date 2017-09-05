import {Component, Input, OnInit} from '@angular/core';
import {product} from "../../models/product";

@Component({
  selector: 'app-category-product-card',
  template: `
    <div class="category-product-card card text-center" style="width: 20rem;">
      <img class="card-img-top" src="http://lorempixel.com/318/80/food?random={{product.id}}" alt="{{product.name}}">
      <div class="card-block">
        <h4 class="card-title">{{product.name}}</h4>
        <a uiSref="product" [uiParams]="{ productId: product.id }" class="btn btn-link">View more</a>
      </div>
    </div>
  `,
  styles: [
    '.category-product-card {margin-right: 15px;}'
  ]
})
export class CategoryProductCardComponent implements OnInit {

  @Input() product: product;

  constructor() { }

  ngOnInit() {
  }

}
