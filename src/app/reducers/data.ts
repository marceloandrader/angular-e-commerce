import { Action } from '@ngrx/store';
import * as dataModel from '../models/data';
import * as data from '../actions/data';
import { merge, without, clone, find } from 'lodash';
import { cart } from '../models/cart';

export function reducer(state = dataModel.defaults, action: data.Actions): dataModel.Data {
  let stateCopy = clone(state);
  switch (action.type) {
    case data.ActionTypes.LOAD_PRODUCTS_SUCCESS:
      delete stateCopy.products;
      return merge({}, stateCopy, {products: action.payload});
    case data.ActionTypes.LOAD_PRODUCT_SUCCESS:
      return merge({}, state, {currentProduct: action.payload[0]});
    case data.ActionTypes.LOAD_CATEGORIES_WITH_PRODUCTS_SUCCESS:
      return merge({}, state, {categoriesWithProducts: action.payload});
    case data.ActionTypes.ADD_TO_CART:
      if (!stateCopy.cart) {
        stateCopy.cart = {products: []};
      }
      const found = stateCopy.cart.products.find((p) => {
        return p.id === action.payload.id;
      });
      if (!found) {
        stateCopy.cart.products.push(merge({quantity: 1}, action.payload))
      }
      return merge({}, stateCopy);
    case data.ActionTypes.REMOVE_FROM_CART:
      stateCopy.cart.products = without(stateCopy.cart.products, action.payload)
      return merge({}, stateCopy);
    case data.ActionTypes.INCREASE_CART:
      stateCopy.cart.products.map((p) => {
        if (p.id === action.payload.id) {
          p.quantity += 1;
        }
      })
      return merge({}, stateCopy);
    case data.ActionTypes.DECREASE_CART:
      stateCopy.cart.products.map((p) => {
        if (p.id === action.payload.id) {
          p.quantity -= 1;
        }
      })
      return merge({}, stateCopy);
    case data.ActionTypes.LOGIN_SUCCESS:
      return merge({}, state, {currentUser: action.payload[0]});
    case data.ActionTypes.LOGOUT:
      return dataModel.defaults;
    case data.ActionTypes.CHECKOUT_CART_SUCCESS:
      delete stateCopy.cart;
      return merge({}, stateCopy);
    case data.ActionTypes.LOAD_ORDERS_SUCCESS:
      delete stateCopy.orders;
      return merge({}, stateCopy, {orders: action.payload});
    case data.ActionTypes.LOAD_CATEGORIES_SUCCESS:
      delete stateCopy.categories;
      return merge({}, state, {categories: action.payload});
    case data.ActionTypes.LOAD_USERS_SUCCESS:
      delete stateCopy.users;
      return merge({}, state, {users: action.payload});
    case data.ActionTypes.DELETE_PRODUCT:
    case data.ActionTypes.SAVE_PRODUCT:
      return merge({}, stateCopy, {savedProduct: false});
    case data.ActionTypes.SAVE_PRODUCT_SUCCESS:
    case data.ActionTypes.DELETE_PRODUCT_SUCCESS:
      return merge({}, stateCopy, {savedProduct: true});
    default:
      return state;
  }
}

export const getCurrentUser = (state: dataModel.Data) => state.currentUser;
export const getProducts = (state: dataModel.Data) => state.products;
export const getCurrentProduct = (state: dataModel.Data) => state.currentProduct;
export const getCategoriesWithProducts  = (state: dataModel.Data) => state.categoriesWithProducts;
export const getCart  = (state: dataModel.Data) => state.cart;
export const getOrders = (state: dataModel.Data) => state.orders;
export const getUsers = (state: dataModel.Data) => state.users;
export const getCategories = (state: dataModel.Data) => state.categories;
export const isSavedProduct = (state: dataModel.Data) => state.savedProduct;
