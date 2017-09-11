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
            <p class="card-text">Order date: {{order.created_on | date:'mediumDate'}}.</p>
            <a class="btn btn-outline-primary" (click)="showDetails(order.id)" *ngIf="!isShowingDetails[order.id]">View details</a>
            <a class="btn btn-outline-primary" (click)="hideDetails(order.id)" *ngIf="isShowingDetails[order.id]">Hide details</a>

            <ul *ngIf="isShowingDetails[order.id]">
              <li *ngFor="let od of order.order_details">{{od.products.name}} &times; {{od.qty}} ~ {{od.price | number:'1.2'}} USD = {{od.qty * od.price | number:'1.2'}} </li>
            </ul>
          </div>
      </div>
    </div>
  `,
  styles: []
})
export class MyOrdersComponent implements OnInit {

  public orders:Array<order>;
  public isShowingDetails: Array<boolean> = [];

  constructor(private store: Store<fromRoot.State>) {
    this.store.select(fromRoot.getOrders)
      .subscribe((orders) => this.orders = orders)
  }

  ngOnInit() {
  }

  showDetails(id) {
    this.isShowingDetails[id] = true;
  }

  hideDetails(id) {
    this.isShowingDetails[id] = false;
  }

}
