import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Effect, Actions} from '@ngrx/effects';
import {Action} from '@ngrx/store';
import * as data from '../actions/data';
import {DataService} from '../services/data.service';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/catch';
import {ToasterService} from 'angular2-toaster';
import { mapKeys, keys, isObject } from 'lodash';

@Injectable()
export class DataEffects {

  @Effect()
  loadProducts$: Observable<Action> = this.actions$.ofType(data.ActionTypes.LOAD_PRODUCTS)
    .debounceTime(300)
    .map((action: data.LoadProductsAction) => action.payload)
    .switchMap(payload => this.dataService.loadProducts()
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
  load$: Observable<Action> = this.actions$.ofType(data.ActionTypes.LOAD)
    .debounceTime(300)
    .map((action: data.UpdateAction) => action.payload)
    .switchMap(payload => this.dataService.load()
      .map(res => new data.LoadSuccessAction(res))
      .catch(err => of(new data.ServerFailAction(err)))
    );

  @Effect()
  add$: Observable<Action> = this.actions$.ofType(data.ActionTypes.ADD)
    .debounceTime(300)
    .map((action: data.UpdateAction) => action.payload)
    .switchMap(payload => this.dataService.add(payload)
      .map(res => new data.ServerAddSuccessAction(res))
      .catch(err => of(new data.ServerFailAction(err)))
    );

  @Effect({dispatch: false})
  addFail$: Observable<Action> = this.actions$.ofType(data.ActionTypes.SERVER_FAIL)
    .debounceTime(300)
    .map((action: data.UpdateAction) => action.payload)
    .switchMap(payload => {
      this.toasterService.pop('error', 'Failure',
        isObject(payload) ? keys(
          mapKeys(payload, (value: string, key: string) => `${key}: ${value}`)).join(';') :
          payload);
      return of(null);
    });

  @Effect()
  remove$: Observable<Action> = this.actions$.ofType(data.ActionTypes.REMOVE)
    .debounceTime(300)
    .map((action: data.UpdateAction) => action.payload)
    .switchMap(payload => this.dataService.remove(payload)
      .map(res => new data.RemoveSuccessAction(payload))
      .catch(err => of(new data.ServerFailAction(err)))
    );

  @Effect()
  update$: Observable<Action> = this.actions$.ofType(data.ActionTypes.UPDATE)
    .debounceTime(300)
    .map((action: data.UpdateAction) => action.payload)
    .switchMap(payload => this.dataService.update(payload)
      .map(res => new data.UpdateSuccessAction(res))
      .catch(err => of(new data.ServerFailAction(err)))
    );

  @Effect({dispatch: false})
  refreshToken$: Observable<Action> = this.actions$.ofType(data.ActionTypes.REFRESH_TOKEN)
    .debounceTime(300)
    .switchMap(() => this.dataService.refreshToken().map(() => null));


  constructor(private actions$: Actions, private dataService: DataService, private toasterService: ToasterService) {
  }
}
