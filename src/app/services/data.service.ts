import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { trim } from 'lodash';
import {Store} from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as data from '../actions/data';
import { clone } from 'lodash';

@Injectable()
export class DataService {

  constructor(private http: HttpClient, private store: Store<fromRoot.State>) { }

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
    queries.push('select=*,category(*)');
    queries.push('order=category_id,id');
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

  dispatchLoadOrders() {
    this.store.dispatch(new data.LoadOrdersAction({}));
  }

  loadOrders() {
    return this.http.get('http://localhost:3000/orders?select=*,order_details(*, products(*))&user_id=eq.1&order=id.desc');
  }

  dispatchLoadCategories(params) {
    this.store.dispatch(new data.LoadCategoriesAction(params));
  }

  loadCategories(params) {
    return this.http.get('http://localhost:3000/categories');
  }

  dispatchLoadUsers(params) {
    this.store.dispatch(new data.LoadUsersAction(params));
  }

  loadUsers(params) {
    return this.http.get('http://localhost:3000/users');
  }

  saveProduct(product) {
    if (product.id) {
      return this.http.patch('http://localhost:3000/products?id=eq.' + product.id, product);
    }
    const productClone = clone(product);
    delete productClone.id;
    return this.http.post('http://localhost:3000/products', productClone);
  }

  deleteProduct(product) {
    return this.http.delete('http://localhost:3000/products?id=eq.' + product.id);
  }
}
