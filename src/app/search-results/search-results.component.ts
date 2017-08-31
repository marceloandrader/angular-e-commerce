import {Component, OnDestroy, OnInit} from '@angular/core';
import * as fromRoot from '../reducers';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/map';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-search-results',
  template: `
    <app-product-card *ngFor="let product of getProducts() | async"
                      [product]="product"></app-product-card>
    <p class="text-center">
    <a href="#">Next Page</a>
    </p>
  `,
  styles: []
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  private alive = true;

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() {
  }

  ngOnDestroy () {
    this.alive = false;
  }

  getProducts() {
    return this.store.select(fromRoot.getProducts)
      .takeWhile(() => this.alive);
  }

}
