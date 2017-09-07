import { Action } from '@ngrx/store';
import * as dataModel from '../models/data';
import * as data from '../actions/data';
import { merge, without, clone, find } from 'lodash';
import { cart } from '../models/cart';

export function reducer(state = dataModel.defaults, action: data.Actions): dataModel.Data {
  let stateCopy = clone(state);
  switch (action.type) {
    case data.ActionTypes.LOAD_SUCCESS:
      return merge({}, state, {cards: action.payload});
    case data.ActionTypes.LOAD_PRODUCTS_SUCCESS:
      delete stateCopy.products;
      return merge({}, stateCopy, {products: action.payload});
    case data.ActionTypes.LOAD_PRODUCT_SUCCESS:
      return merge({}, state, {currentProduct: action.payload[0]});
    case data.ActionTypes.LOAD_CATEGORIES_WITH_PRODUCTS_SUCCESS:
      return merge({}, state, {categories: action.payload});
    case data.ActionTypes.SERVER_ADD_SUCCESS:
      return merge({}, state, {cards: [ ...state.cards, action.payload ]});
    case data.ActionTypes.UPDATE_SUCCESS:
      stateCopy.cards = without(state.cards, find(state.cards, (card) => card.id === action.payload.id));
      stateCopy.cards.push(action.payload);
      return merge({}, stateCopy);
    case data.ActionTypes.REMOVE_SUCCESS:
      stateCopy.cards = without(state.cards, action.payload);
      return merge({}, stateCopy);
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
      delete stateCopy.currentUser;
      return merge({}, stateCopy);
    default:
      return state;
  }
}

export const getCurrentUser = (state: dataModel.Data) => state.currentUser;
export const getCards = (state: dataModel.Data) => state.cards;
export const getProducts = (state: dataModel.Data) => state.products;
export const getCurrentProduct = (state: dataModel.Data) => state.currentProduct;
export const getCategoriesWithProducts  = (state: dataModel.Data) => state.categories;
export const getCart  = (state: dataModel.Data) => state.cart;
