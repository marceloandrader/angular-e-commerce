import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-product-card',
  template: `
    <div class="category-product-card card text-center" style="width: 20rem;">
      <img class="card-img-top" src="http://lorempixel.com/80/80" alt="Card image cap">
      <div class="card-block">
        <h4 class="card-title">Product 1</h4>
        <a href="#" class="btn btn-link">View</a>
      </div>
    </div>
  `,
  styles: [
    '.category-product-card {margin-right: 15px;}'
  ]
})
export class CategoryProductCardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
