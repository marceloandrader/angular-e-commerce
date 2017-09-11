import {Component, OnDestroy, OnInit} from '@angular/core';
import {cart} from "../models/cart";
import {Store} from "@ngrx/store";
import * as fromRoot from '../reducers';
import * as data from '../actions/data';
import {isUndefined} from "util";
import { ToasterService } from "angular2-toaster/src/toaster.service";
import {StateService} from "@uirouter/angular/lib";
import {clone} from 'lodash';

@Component({
  selector: 'app-cart',
  template: `
    <app-product-in-cart *ngFor="let product of cart?.products" [product]="product"></app-product-in-cart>

    <div class="text-center" *ngIf="getCartTotal() == 0">
      <a uiSref="home">Please add some products to the cart</a>
    </div>

    <div class="text-center" *ngIf="getCartTotal() > 0">
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

  constructor(private store: Store<fromRoot.State>, private toasterService: ToasterService, private state: StateService) {
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
    const self = this;

    const handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_VDbEHDrcTUDgBBrt2GLRHhmF',
      locale: 'auto',
      token: function (token: any) {
        const clonedCart = clone(self.cart);
        clonedCart.payment_token = token.id;
        self.store.dispatch(new data.CheckoutCartAction(clonedCart));
        self.getCart().subscribe((cart) => {
          if (!cart) {
            // cart is empty checkout processed correctly
            self.toasterService.pop('success', 'Checkout correct', 'Successfully created order');
            self.state.go('my-orders');
          }
        });
      }
    });

    handler.open({
      name: 'Angular e-commerce',
      description: `You are buying ${this.cart.products.length} items`,
      amount: this.getCartTotal() * 100
    });

  }
}
