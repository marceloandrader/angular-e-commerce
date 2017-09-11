import { createSelector } from 'reselect';
import {ActionReducer, ActionReducerMap, MetaReducer} from '@ngrx/store';
import { compose } from '@ngrx/store';
import { storeLogger } from 'ngrx-store-logger';
import { localStorageSync } from 'ngrx-store-localstorage';
import { storeFreeze } from 'ngrx-store-freeze';
import { combineReducers } from '@ngrx/store';

import { environment } from '../../environments/environment';

import * as dataModel from '../models/data';
import * as uiModel from '../models/ui';

import * as fromData from './data';
import * as fromUi from './ui';

export interface State {
  data: dataModel.Data;
  ui: uiModel.Ui;
}

export const reducers: ActionReducerMap<State> = {
  data: fromData.reducer,
  ui: fromUi.reducer
};

export function logger(reducer: ActionReducer<State>): any {
  // default, no options
  return storeLogger()(reducer);
}

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({keys: ['ui', 'data'], rehydrate: true})(reducer);
}

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [logger, localStorageSyncReducer]
  : [localStorageSyncReducer];

/* Data */

export const getDataState = (state: State) => state.data;

export const getProducts = createSelector(getDataState, fromData.getProducts);

export const getCurrentProduct = createSelector(getDataState, fromData.getCurrentProduct);

export const getCategoriesWithProducts = createSelector(getDataState, fromData.getCategoriesWithProducts);

export const getCart = createSelector(getDataState, fromData.getCart);

export const getCurrentUser = createSelector(getDataState, fromData.getCurrentUser);

export const getOrders = createSelector(getDataState, fromData.getOrders);

export const getUsers = createSelector(getDataState, fromData.getUsers);

export const getCategories = createSelector(getDataState, fromData.getCategories);

export const isSavedProduct = createSelector(getDataState, fromData.isSavedProduct);

/* Data */

export const getUiState = (state: State) => state.ui;

export const getToolbarColor = createSelector(getUiState, fromUi.getToolbarColor);
