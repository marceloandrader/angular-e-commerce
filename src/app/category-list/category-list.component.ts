import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-category-list',
  template: `
    <div class="category card">
      <div class="card-header">
        Category Name
      </div>
      <div class="card-block">
        <div class="card-deck">
        <app-category-product-card></app-category-product-card>
        <app-category-product-card></app-category-product-card>
        <app-category-product-card></app-category-product-card>
        <app-category-product-card></app-category-product-card>
        </div>
      </div>
    </div>
  `,
  styles: [
    '.category { margin-bottom: 1rem; }'
  ]
})
export class CategoryListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
