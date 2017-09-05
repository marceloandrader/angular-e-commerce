import { Action } from '@ngrx/store';
import * as dataModel from '../models/data';
import * as data from '../actions/data';
import { merge, without, clone, find } from 'lodash';


export function reducer(state = dataModel.defaults, action: data.Actions): dataModel.Data {
  let stateCopy = clone(state);
  switch (action.type) {
    case data.ActionTypes.LOAD_SUCCESS:
      return merge({}, state, {cards: action.payload});
    case data.ActionTypes.LOAD_PRODUCTS_SUCCESS:
      return merge({}, state, {products: action.payload});
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
    default:
      return state;
  }
}

export const getCards = (state: dataModel.Data) => state.cards;
export const getProducts = (state: dataModel.Data) => state.products;
export const getCurrentProduct = (state: dataModel.Data) => state.currentProduct;
export const getCategoriesWithProducts  = (state: dataModel.Data) => state.categories;
