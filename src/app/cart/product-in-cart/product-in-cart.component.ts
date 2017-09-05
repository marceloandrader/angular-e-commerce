import {Component, Input, OnInit} from '@angular/core';
import {product} from "../../models/product";
import * as fromRoot from '../../reducers';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/map';
import {Store} from "@ngrx/store";
import {Observable} from "rxjs/Observable";
import * as data from '../../actions/data';
import {StateService} from "@uirouter/angular/lib";
import {ToasterService} from "angular2-toaster";


@Component({
  selector: 'app-product-in-cart',
  template: `
    <div class="product-card card">
      <div class="card-block">
        <img src="http://lorempixel.com/120/120/food?random={{product.id}}" class="rounded float-left mr-4" alt="Product picture">
        <h4 class="card-title">{{product.name}}</h4>
        <h6 class="card-subtitle mb-2 text-muted">Price: {{product.price | number:'1.2'}}USD</h6>
        <p class="card-text">{{product.description}}</p>
        
        <p class="card-text"><strong>Quantity:</strong> {{product.quantity}} 
          <button (click)="increase(product)">+</button>
          <button (click)="decrease(product)">-</button>
        </p>
        
        <a href="javascript:void(false);" (click)="addToCart(product)" class="float-right btn btn-primary">Remove from Cart</a>
      </div>
    </div>
  `,
  styles: [
    '.product-card {margin-bottom: 0.50rem; padding: 0.8rem;}'
  ]
})
export class ProductInCartComponent implements OnInit {
  @Input() product: product;

  constructor(private store: Store<fromRoot.State>, private state: StateService, private toasterService: ToasterService) { }

  ngOnInit() {
  }

  addToCart(product) {
    this.store.dispatch(new data.RemoveFromCartAction(product));
    this.toasterService.pop('success', 'Removed from Cart', 'Successfully removed from cart');
    this.state.go('cart');
  }

  increase(product) {
    this.store.dispatch(new data.IncreaseCartAction(product));
  }

  decrease(product) {
    this.store.dispatch(new data.DecreaseCartAction(product));
  }
}
