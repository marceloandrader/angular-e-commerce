import { Component, OnInit, OnDestroy } from '@angular/core';
import { product } from "../../models/product";
import * as fromRoot from '../../reducers';
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-admin-products',
  template: `
  <table class="table">
  <thead>
  <tr>
    <th>ID</th>
    <th>Category</th>
    <th>Name</th>
    <th>Description</th>
    <th class="text-right">Price (USD)</th>
  </tr>
  </thead>
  <tbody>
    <tr *ngFor="let product of getProducts()| async">
      <td><a uiSref="edit-product">{{product.id}}</a></td>
      <td>{{product.category?.name}}</td>
      <td>{{product.name}}</td>
      <td>{{product.description}}</td>
      <td class="text-right">{{product.price | number:'1.2'}}</td>
    </tr>
  </tbody>
  </table>
  `,
  styles: []
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  private alive = true;
  public products: Array<product>;

  constructor(private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.alive = false;
  }

  getProducts() {
    return this.store.select(fromRoot.getProducts)
      .takeWhile(() => this.alive);
  }

}
