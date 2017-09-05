import {Component, Input, OnInit} from '@angular/core';
import {category} from "../models/category";

@Component({
  selector: 'app-category-list',
  template: `
    <div class="category card">
      <div class="card-header">
        {{category.name}}
        <a class="card-link float-right" uiSref="search" [uiParams]="{ category: category.id }">View More on this Category</a>
      </div>
      <div class="card-block">
        <div class="card-deck">
        <app-category-product-card *ngFor="let product of category.products | slice:0:3"
                                   [product]="product"></app-category-product-card>
        </div>
      </div>
    </div>
  `,
  styles: [
    '.category { margin-bottom: 1rem; }'
  ]
})
export class CategoryListComponent implements OnInit {

  @Input() category: category;

  constructor() { }

  ngOnInit() {
  }

}
