import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Effect, Actions} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import * as data from '../actions/data';
import * as fromRoot from '../reducers';
import {DataService} from '../services/data.service';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/catch';
import {ToasterService} from 'angular2-toaster';
import { mapKeys, keys, isObject } from 'lodash';
import {LoginAction} from "../actions/data";

@Injectable()
export class DataEffects {

  @Effect()
  loadProducts$: Observable<Action> = this.actions$.ofType(data.ActionTypes.LOAD_PRODUCTS)
    .debounceTime(300)
    .map((action: data.LoadProductsAction) => action.payload)
    .switchMap(payload => this.dataService.loadProducts(payload)
      .map(res => new data.LoadProductsSuccessAction(res))
      .catch(err => of(new data.ServerFailAction(err)))
    );

  @Effect()
  loadProduct$: Observable<Action> = this.actions$.ofType(data.ActionTypes.LOAD_PRODUCT)
    .debounceTime(300)
    .map((action: data.LoadProductAction) => action.payload)
    .switchMap(payload => this.dataService.loadProduct(payload.productId)
          .map(res => new data.LoadProductSuccessAction(res))
          .catch(err => of(new data.ServerFailAction(err)))
    );


  @Effect()
  loadCategoriesWithProducts$: Observable<Action> = this.actions$.ofType(data.ActionTypes.LOAD_CATEGORIES_WITH_PRODUCTS)
    .debounceTime(300)
    .map((action: data.LoadCategoriesWithProductsAction) => action.payload)
    .switchMap(payload => this.dataService.loadCategoriesWithProducts()
      .map(res => new data.LoadCategoriesWithProductsSuccessAction(res))
      .catch(err => of(new data.ServerFailAction(err)))
    );

  @Effect()
  login$: Observable<Action> = this.actions$.ofType(data.ActionTypes.LOGIN)
    .debounceTime(300)
    .map((action: data.LoginAction) => action.payload)
    .switchMap(payload => this.dataService.login(payload)
      .map(res => new data.LoginSuccessAction(res))
      .catch(err => of(new data.ServerFailAction(err)))
    );

  @Effect()
  signup$: Observable<Action> = this.actions$.ofType(data.ActionTypes.SIGNUP)
    .debounceTime(300)
    .map((action: data.SignupAction) => action.payload)
    .switchMap(payload => this.dataService.signup(payload)
      .map(res => new data.SignupSuccessAction(payload))
      .catch(err => of(new data.ServerFailAction(err)))
    );

  @Effect()
  signupSuccess$: Observable<Action> = this.actions$.ofType(data.ActionTypes.SIGNUP_SUCCESS)
    .debounceTime(300)
    .map((action: data.SignupSuccessAction) => action.payload)
    .switchMap(payload => this.dataService.login({email: payload.email, pass: payload.pass})
      .map(res => new data.LoginSuccessAction(payload))
      .catch(err => of(new data.ServerFailAction(err)))
    );

  @Effect()
  checkoutCart$: Observable<Action> = this.actions$.ofType(data.ActionTypes.CHECKOUT_CART)
    .debounceTime(300)
    .map((action: data.CheckoutCartAction) => action.payload)
    .switchMap(payload => this.dataService.checkout(payload)
      .map(res => new data.CheckoutCartSuccessAction(res))
      .catch(err => of(new data.ServerFailAction(err)))
    );


  @Effect()
  loadOrders$: Observable<Action> = this.actions$.ofType(data.ActionTypes.LOAD_ORDERS)
    .debounceTime(300)
    .map((action: data.LoadOrdersAction) => action.payload)
    .switchMap(payload => this.dataService.loadOrders()
          .map(res => new data.LoadOrdersSuccessAction(res))
          .catch(err => of(new data.ServerFailAction(err)))
    );

  @Effect()
  loadUsers$: Observable<Action> = this.actions$.ofType(data.ActionTypes.LOAD_USERS)
    .debounceTime(300)
    .map((action: data.LoadUsersAction) => action.payload)
    .switchMap(payload => this.dataService.loadUsers(payload)
      .map(res => new data.LoadUsersSuccessAction(res))
      .catch(err => of(new data.ServerFailAction(err)))
    );

  @Effect()
  loadCategories$: Observable<Action> = this.actions$.ofType(data.ActionTypes.LOAD_CATEGORIES)
    .debounceTime(300)
    .map((action: data.LoadCategoriesAction) => action.payload)
    .switchMap(payload => this.dataService.loadCategories(payload)
      .map(res => new data.LoadCategoriesSuccessAction(res))
      .catch(err => of(new data.ServerFailAction(err)))
    );

  @Effect()
  saveProduct$: Observable<Action> = this.actions$.ofType(data.ActionTypes.SAVE_PRODUCT)
    .debounceTime(300)
    .map((action: data.SaveProductAction) => action.payload)
    .switchMap(payload => this.dataService.saveProduct(payload)
      .map(res => new data.SaveProductSuccessAction(res))
      .catch(err => of(new data.ServerFailAction(err)))
    );

  @Effect()
  deleteProduct$: Observable<Action> = this.actions$.ofType(data.ActionTypes.DELETE_PRODUCT)
    .debounceTime(300)
    .map((action: data.DeleteProductAction) => action.payload)
    .switchMap(payload => this.dataService.deleteProduct(payload)
      .map(res => new data.DeleteProductSuccessAction(res))
      .catch(err => of(new data.ServerFailAction(err)))
    );


  @Effect()
  loadSystemOrders$: Observable<Action> = this.actions$.ofType(data.ActionTypes.LOAD_SYSTEM_ORDERS)
    .debounceTime(300)
    .map((action: data.LoadSystemOrdersAction) => action.payload)
    .switchMap(payload => this.dataService.loadSystemOrders()
      .map(res => new data.LoadSystemOrdersSuccessAction(res))
      .catch(err => of(new data.ServerFailAction(err)))
    );


  @Effect()
  deleteOrder$: Observable<Action> = this.actions$.ofType(data.ActionTypes.DELETE_ORDER)
    .debounceTime(300)
    .map((action: data.DeleteOrderAction) => action.payload)
    .switchMap(payload => this.dataService.deleteOrder(payload)
      .map(res => new data.DeleteOrderSuccessAction(res))
      .catch(err => of(new data.ServerFailAction(err)))
    );

  @Effect({dispatch: false})
  addFail$: Observable<Action> = this.actions$.ofType(data.ActionTypes.SERVER_FAIL)
    .debounceTime(300)
    .map((action: data.LoginAction) => action.payload)
    .switchMap(payload => {
      console.log (payload)
      this.toasterService.pop('error', 'Failure', payload.message);
      return of(null);
    });

  constructor(private actions$: Actions, private dataService: DataService, private toasterService: ToasterService, private store: Store<fromRoot.State>) {
  }
}
