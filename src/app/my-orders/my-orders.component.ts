import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import * as fromRoot from '../reducers'
import { order } from "../models/order";

@Component({
  selector: 'app-my-orders',
  template: `
    <div class="row pt-3" *ngFor="let order of orders">
      <div class="card" style="width:100%">
          <div class="card-block">
            <h4 class="card-title">Order Number {{order.id}} <span class="badge-success">{{order.status}}</span> </h4>
            <p class="card-text">Order date: {{order.created_on}}.</p>
            <a href="#" class="btn btn-outline-primary">View details</a>
          </div>
      </div>
    </div>
  `,
  styles: []
})
export class MyOrdersComponent implements OnInit {

  private orders:Array<order>;

  constructor(private store: Store<fromRoot.State>) {
    this.store.select(fromRoot.getOrders)
      .subscribe((orders) => this.orders = orders)
  }

  ngOnInit() {
  }

}
