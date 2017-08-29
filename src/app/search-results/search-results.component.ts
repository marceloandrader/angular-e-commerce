import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-results',
  template: `
    <app-product-card></app-product-card>
    <app-product-card></app-product-card>
    <app-product-card></app-product-card>
    <app-product-card></app-product-card>
    <app-product-card></app-product-card>
    <app-product-card></app-product-card>
    <app-product-card></app-product-card>
    <app-product-card></app-product-card>
    <app-product-card></app-product-card>
    <app-product-card></app-product-card>
    <app-product-card></app-product-card>
    <app-product-card></app-product-card>
    <p class="text-center">
    <a href="#">Next Page</a>
    </p>
  `,
  styles: []
})
export class SearchResultsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
