import {Component, OnDestroy, OnInit} from '@angular/core';
import * as fromRoot from '../reducers';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/map';
import {Store} from "@ngrx/store";
import {Observable} from "rxjs/Observable";
import {product} from "../models/product";

@Component({
  selector: 'app-product',
  template: `
    <img src="http://lorempixel.com/636/160/food?random={{product?.id}}" alt="{{product?.name}}">
    <br>
    <strong>Product:</strong>
    {{product?.name}}
    <br>
    <strong>Description:</strong>
    {{product?.description}}
    <br>
    <strong>Price:</strong>
    {{product?.price}}
    <br>
    <a uiSref="cart" class="btn btn-primary">Add to Cart</a>
  `,
  styles: []
})
export class ProductComponent implements OnInit, OnDestroy {

  public product?: product;
  private alive = true;

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.getProduct().subscribe((currentProduct: product) => this.product = currentProduct);
  }

  ngOnDestroy () {
    this.alive = false;
  }

  getProduct() {
    return this.store.select(fromRoot.getCurrentProduct)
      .takeWhile(() => this.alive);
  }
}
