import {Component, OnDestroy, OnInit} from '@angular/core';
import {cart} from "../models/cart";
import {Store} from "@ngrx/store";
import * as fromRoot from '../reducers';
import * as data from '../actions/data';
import {isUndefined} from "util";

@Component({
  selector: 'app-cart',
  template: `
    <app-product-in-cart *ngFor="let product of cart?.products" [product]="product"></app-product-in-cart>

    <div class="text-center">
      <button class="btn btn-lg btn-success" *ngIf="loggedIn" (click)="checkoutCurrentCart()">Checkout Total: {{getCartTotal() | number:'1.2'}}</button>
      <a class="btn btn-lg btn-warning" uiSref="login" *ngIf="!loggedIn">First login or signup to checkout this cart</a>
      or
      <a uiSref="home">continue shopping</a>
    </div>
  `,
  styles: []
})
export class CartComponent implements OnInit, OnDestroy {

  public cart: cart;
  private alive = true;
  public loggedIn: boolean;

  constructor(private store: Store<fromRoot.State>) {
    this.store.select(fromRoot.getCurrentUser)
      .subscribe((user) => {
        this.loggedIn = !isUndefined(user);
      });
  }

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

  getCartTotal() {
    if (!this.cart) return 0;
    return this.cart.products.reduce(function(previousValue, currentValue){
      return previousValue + (currentValue.quantity * currentValue.price);
    }, 0);
  }

  checkoutCurrentCart() {
      this.store.dispatch(new data.CheckoutCartAction(this.cart));
  }
}
