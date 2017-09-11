import { Component, OnInit, OnDestroy } from '@angular/core';
import { product } from "../../models/product";
import * as fromRoot from '../../reducers';
import {Store} from "@ngrx/store";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToasterService} from "angular2-toaster";
import * as data from '../../actions/data';

@Component({
  selector: 'app-admin-products',
  template: `
    <h2>Manage Products <a href="javascript:void(false);" (click)="newProduct()">New Product</a></h2>
    <form (submit)="saveProduct()" *ngIf="showForm">
      <fieldset>
        <legend>New Product</legend>
        <div class="form-group row required">
          <label class="col-form-label col-sm-2">Name:</label>
          <div class="col-sm-10">
            <input type="hidden" [formControl]="productForm.controls['id']">
            <input type="text" placeholder="Product Name" class="form-control" [formControl]="productForm.controls['name']">
          </div>
        </div>
        <div class="form-group row">
          <label class="col-form-label col-sm-2">Category:</label>
          <div class="col-sm-10">
            <select class="form-control"  [formControl]="productForm.controls['category_id']">
              <option value="{{cat.id}}" *ngFor="let cat of getCategories() | async">{{cat.name}}</option>
            </select>
          </div>
        </div>
        <div class="form-group row">
          <label class="col-form-label col-sm-2">Description:</label>
          <div class="col-sm-10">
            <input type="text" placeholder="Description" class="form-control" [formControl]="productForm.controls['description']">
          </div>
        </div>
        <div class="form-group row">
          <label class="col-form-label col-sm-2">Price:</label>
          <div class="col-sm-10">
            <input type="number" placeholder="Price" class="form-control" [formControl]="productForm.controls['price']">
          </div>
        </div>
        <button class="btn btn-primary" type="submit">Save</button> or <a href="javascript:void(false);" (click)="cancelForm()">cancel</a>
      </fieldset>
    </form>
    <table class="table">
      <thead>
      <tr>
        <th>ID</th>
        <th>Category</th>
        <th>Name</th>
        <th>Description</th>
        <th class="text-right">Price (USD)</th>
        <th class="text-right" *ngIf="isAdmin">Delete</th>
      </tr>
      </thead>
      <tbody>
      <tr *ngFor="let product of getProducts()| async">
        <td><a href="javascript:void(false);" (click)="editProduct(product)">{{product.id}}</a></td>
        <td>{{product.category?.name}}</td>
        <td>{{product.name}}</td>
        <td>{{product.description}}</td>
        <td class="text-right">{{product.price | number:'1.2'}}</td>
        <td class="text-right" *ngIf="isAdmin"><a href="javascript:void(false);" (click)="deleteProduct(product)">Delete?</a></td>
      </tr>
      </tbody>
    </table>
  `,
  styles: []
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  private alive = true;
  private waiting = false;
  public showForm: boolean = false;
  productForm: FormGroup;

  public isAdmin: boolean;
  public isManager: boolean;


  constructor(private store: Store<fromRoot.State>, fb: FormBuilder, private toasterService: ToasterService) {
    this.productForm = fb.group({
      'id': [null],
      'name': [null, Validators.compose([Validators.required, Validators.minLength(3)])],
      'category_id': [null, Validators.compose([Validators.required])],
      'description': [null, Validators.compose([Validators.required])],
      'price': [null, Validators.compose([Validators.required, Validators.min(1)])],
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

  getProducts() {
    return this.store.select(fromRoot.getProducts)
      .takeWhile(() => this.alive);
  }

  getCategories() {
    return this.store.select(fromRoot.getCategories)
      .takeWhile(() => this.alive);
  }

  newProduct() {
    this.productForm.reset();
    this.showForm = true;
  }

  cancelForm() {
    this.showForm = false;
    this.productForm.reset();
  }

  editProduct(product) {
    this.showForm = true;
    this.productForm.controls['id'].setValue(product.id);
    this.productForm.controls['name'].setValue(product.name);
    this.productForm.controls['description'].setValue(product.description);
    this.productForm.controls['price'].setValue(product.price);
    this.productForm.controls['category_id'].setValue(product.category.id);
  }

  deleteProduct(product) {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }
    this.store.dispatch(new data.DeleteProductAction(product));
    this.waiting = true;
    this.store.select(fromRoot.isSavedProduct)
      .takeWhile(() => this.waiting)
      .subscribe((savedProduct) => {
        if (savedProduct) {
          this.toasterService.pop('success', 'Product deleted', 'Successfully deleted product');
          this.store.dispatch(new data.LoadProductsAction({}));
          this.waiting = false;
        }
      });
  }

  saveProduct() {
    if (!this.productForm.valid) {
      this.toasterService.pop('warning', 'Invalid Data', 'Please fill all the required fields');
      return;
    }
    this.store.dispatch(new data.SaveProductAction({
      id: this.productForm.controls['id'].value,
      name: this.productForm.controls['name'].value,
      description: this.productForm.controls['description'].value,
      price: this.productForm.controls['price'].value,
      category_id: this.productForm.controls['category_id'].value,
    }));
    this.waiting = true;
    this.store.select(fromRoot.isSavedProduct)
      .takeWhile(() => this.waiting)
      .subscribe((savedProduct) => {
        if (savedProduct) {
          this.toasterService.pop('success', 'Product saved', 'Successfully saved product');
          this.showForm = false;
          this.store.dispatch(new data.LoadProductsAction({}));
          this.waiting = false;
        }
    });
  }
}
