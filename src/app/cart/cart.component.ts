import {Component, OnDestroy, OnInit} from '@angular/core';
import {cart} from "../models/cart";
import {Store} from "@ngrx/store";
import * as fromRoot from '../reducers';

@Component({
  selector: 'app-cart',
  template: `
    <app-product-card *ngFor="let product of cart?.products" [product]="product"></app-product-card>
    
    <div class="text-center">
      <button class="btn btn-lg btn-success">Checkout</button>
      or
      <a uiSref="home">continue shopping</a>
    </div>
  `,
  styles: []
})
export class CartComponent implements OnInit, OnDestroy {

  public cart: cart;
  private alive = true;

  constructor(private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.getCart().subscribe((cart: cart) => this.cart = cart);
  }

  ngOnDestroy () {
    this.alive = false;
  }

  getCart() {
    return this.store.select(fromRoot.getCart)
      .takeWhile(() => this.alive);
  }
}
