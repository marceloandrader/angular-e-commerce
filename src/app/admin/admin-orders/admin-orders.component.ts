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

  editOrder(order) {
    this.showForm = true;
    this.productForm.controls['id'].setValue(order.id);
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

  // saveProduct() {
  //   if (!this.productForm.valid) {
  //     this.toasterService.pop('warning', 'Invalid Data', 'Please fill all the required fields');
  //     return;
  //   }
  //   this.store.dispatch(new data.SaveProductAction({
  //     id: this.productForm.controls['id'].value,
  //     name: this.productForm.controls['name'].value,
  //     description: this.productForm.controls['description'].value,
  //     price: this.productForm.controls['price'].value,
  //     category_id: this.productForm.controls['category_id'].value,
  //   }));
  //   this.waiting = true;
  //   this.store.select(fromRoot.isSavedProduct)
  //     .takeWhile(() => this.waiting)
  //     .subscribe((savedProduct) => {
  //       if (savedProduct) {
  //         this.toasterService.pop('success', 'Product saved', 'Successfully saved product');
  //         this.showForm = false;
  //         this.store.dispatch(new data.LoadProductsAction({})); // @TODO not reloading the data on the table
  //         this.waiting = false;
  //       }
  //     });
  // }
}

