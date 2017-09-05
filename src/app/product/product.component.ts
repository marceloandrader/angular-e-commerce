import {Component, OnDestroy, OnInit} from '@angular/core';
import * as fromRoot from '../reducers';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/map';
import {Store} from "@ngrx/store";
import {Observable} from "rxjs/Observable";
import {product} from "../models/product";
import * as data from '../actions/data';
import {StateService} from "@uirouter/angular/lib";
import {ToasterService} from "angular2-toaster";

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
    {{product?.price | number:'1.2'}}
    <br>
    <a href="javascript:void(false);" class="btn btn-primary" (click)="addToCart(product)">Add to Cart</a>
  `,
  styles: []
})
export class ProductComponent implements OnInit, OnDestroy {

  public product?: product;
  private alive = true;

  constructor(private store: Store<fromRoot.State>, private state: StateService, private toasterService: ToasterService) { }

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

  addToCart(product) {
    this.store.dispatch(new data.AddToCartAction(product));
    this.toasterService.pop('success', 'Added to Cart', 'Successfully added to cart');
    this.state.go('cart');
  }
}
