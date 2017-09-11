import { Component, OnInit, OnDestroy } from '@angular/core';
import { product } from "../../models/product";
import * as fromRoot from '../../reducers';
import {Store} from "@ngrx/store";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToasterService} from "angular2-toaster";
import * as data from '../../actions/data';

@Component({
  selector: 'app-admin-orders',
  template: `
    <h2>Manage Orders</h2>
    <table class="table">
      <thead>
      <tr>
        <th>ID</th>
        <th>User</th>
        <th>Date</th>
        <th>Status</th>
        <th>Payment Token</th>
        <th class="text-right">Total (USD)</th>
        <th class="text-right" *ngIf="isAdmin">Delete</th>
        <th class="text-right" *ngIf="isManager">Ship</th>
      </tr>
      </thead>
      <tbody>
      <tr *ngFor="let order of getSystemOrders()| async">
        <td>{{order.id}}</td>
        <td>{{order.users?.last_name}} {{order.users?.first_name}} ({{order.users?.email}})</td>
        <td>{{order.created_on | date:'mediumDate'}}</td>
        <td>{{order.status}}</td>
        <td>{{order.payment_token}}</td>
        <td class="text-right">{{getTotal(order) | number:'1.2'}}</td>
        <td class="text-right" *ngIf="isAdmin"><a href="javascript:void(false);" (click)="deleteOrder(order)">Delete?</a></td>
        <td class="text-right" *ngIf="isManager"><a href="javascript:void(false);" (click)="shipOrder(order)">Ship?</a></td>
      </tr>
      </tbody>
    </table>
  `,
  styles: []
})
export class AdminOrdersComponent implements OnInit, OnDestroy {

  private alive = true;
  private waiting = false;
  public showForm: boolean = false;
  productForm: FormGroup;

  public isAdmin: boolean;
  public isManager: boolean;


  constructor(private store: Store<fromRoot.State>, fb: FormBuilder, private toasterService: ToasterService) {
    this.productForm = fb.group({
      'id': [null],
    });

    this.store.select(fromRoot.getCurrentUser)
      .takeWhile(() => this.alive)
      .subscribe((user) => {
        this.isAdmin = user.role === 'api_admin';
        this.isManager = user.role === 'api_manager';
      });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.alive = false;
  }

  getSystemOrders() {
    return this.store.select(fromRoot.getSystemOrders)
      .takeWhile(() => this.alive);
  }

  getTotal(order) {
    if (!order) return 0;
    return order.order_details.reduce(function(previousValue, currentValue){
      return previousValue + (currentValue.qty * currentValue.price);
    }, 0);
  }

  deleteOrder(order) {
    if (!window.confirm('Are you sure you want to delete this order?')) {
      return;
    }
    this.store.dispatch(new data.DeleteOrderAction(order));
    this.waiting = true;
    this.store.select(fromRoot.isSavedOrder)
      .takeWhile(() => this.waiting)
      .subscribe((savedOrder) => {
        if (savedOrder) {
          this.toasterService.pop('success', 'Order deleted', 'Successfully deleted order');
          this.store.dispatch(new data.LoadSystemOrdersAction({}));
          this.waiting = false;
        }
      });
  }

  shipOrder(order) {
    if (!window.confirm('Are you sure you want to ship this order?')) {
      return;
    }
    this.store.dispatch(new data.ShipOrderAction(order));
    this.waiting = true;
    this.store.select(fromRoot.isSavedOrder)
      .takeWhile(() => this.waiting)
      .subscribe((savedOrder) => {
        if (savedOrder) {
          this.toasterService.pop('success', 'Order shipped', 'Successfully shipped order');
          this.store.dispatch(new data.LoadSystemOrdersAction({}));
          this.waiting = false;
        }
      });
  }
}

