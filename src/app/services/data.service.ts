import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { trim } from 'lodash';
import {Store} from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as data from '../actions/data';

@Injectable()
export class DataService {

  constructor(private http: HttpClient, private store: Store<fromRoot.State>) { }

  dispatchLoad() {
    this.store.dispatch(new data.LoadAction({}));
  }

  add(payload) {
    return this.http.post(`/api/v1/cards.json`, {text: trim(payload)});
  }

  load() {
    return this.http.get(`/api/v1/cards.json`);
  }

  remove(payload) {
    return this.http.delete(`/api/v1/cards/${payload.id}.json`);
  }

  update(payload) {
    return this.http.patch(`/api/v1/cards/${payload.id}.json`, payload);
  }

  refreshToken() {
    return this.http.get(`/api/v1/xsrf.json`);
  }

  dispatchLoadProducts(params) {
    this.store.dispatch(new data.LoadProductsAction(params));
  }

  loadProducts(params) {
    let queryString = '?';
    const queries = []
    if (params.category) {
      queries.push('category_id=eq.' + params.category);
    }
    if (params.query) {
      queries.push('name=@@.' + params.query);
    }
    queryString += queries.join('&')
    return this.http.get('http://localhost:3000/products' + queryString);
  }

  dispatchLoadProduct(productId) {
    this.store.dispatch(new data.LoadProductAction({productId: productId}));
  }

  loadProduct(productId) {
    return this.http.get('http://localhost:3000/products?id=eq.' + productId);
  }

  dispatchLoadCategoriesWithProducts() {
    this.store.dispatch(new data.LoadCategoriesWithProductsAction({}));
  }

  loadCategoriesWithProducts() {
    return this.http.get('http://localhost:3000/categories?select=*,products(*)');
  }

  login(params) {
    return this.http.post('http://localhost:3000/rpc/login', params);
  }

  signup(params) {
    return this.http.post('http://localhost:3000/users', {
      email: params.email,
      password: params.pass,
      first_name: params.first,
      last_name: params.last,
      phone: params.phone,
      role: 'user'
    });
  }

  checkout(cart) {
    return this.http.post('http://localhost:3000/rpc/checkout', cart);
  }
}
