import { Action } from '@ngrx/store';
import { type } from '../util';
import {card} from '../models/card';
import {product} from "../models/product";

export const ActionTypes = {
  LOAD: type('[Data] Load Cards'),
  LOAD_SUCCESS: type('[Data] Load Cards Success'),
  ADD: type('[Data] Add Card'),
  REMOVE: type('[Data] Remove Card'),
  REMOVE_SUCCESS: type('[Data] Server Remove Success Card'),
  TOGGLE_PINNED: type('[Data] Toggle Pinned Card'),
  UPDATE: type('[Data] Update Card'),
  UPDATE_SUCCESS: type('[Data] Server Update Success'),
  SERVER_ADD_SUCCESS: type('[Data] Server Add Card Successful'),
  SERVER_FAIL: type('[Data] Server Failure'),
  REFRESH_TOKEN: type('[Data] Refresh Token'),
  REFRESH_TOKEN_SUCCESS: type('[Data] Refresh Token Success'),
  REFRESH_TOKEN_FAIL: type('[Data] Refresh Token Fail'),
  LOAD_PRODUCTS: type('[Data] Load products'),
  LOAD_PRODUCTS_SUCCESS: type('[Data] Load products Success'),
  LOAD_PRODUCT: type('[Data] Load product'),
  LOAD_PRODUCT_SUCCESS: type('[Data] Load product Success'),
  LOAD_CATEGORIES_WITH_PRODUCTS: type('[Data] Load categories'),
  LOAD_CATEGORIES_WITH_PRODUCTS_SUCCESS: type('[Data] Load categories Success'),
  ADD_TO_CART: type('[Data] Add to Cart'),
  REMOVE_FROM_CART: type('[Data] Remove from Cart'),
  INCREASE_CART: type('[Data] Increase qty on product from cart'),
  DECREASE_CART: type('[Data] Decrease qty on product from cart'),
  CHECKOUT_CART: type('[Data] Proceed to checkout the cart'),
  LOGIN: type('[Data] Login'),
  LOGIN_SUCCESS: type('[Data] Login succeeded'),
  LOGOUT: type('[Data] Logout'),
  SIGNUP: type('[Data] Signup'),
  SIGNUP_SUCCESS: type('[Data] Signup succeeded'),
};

export class LoadAction implements Action {
  readonly type = ActionTypes.LOAD;

  constructor(public payload: any) { }
}

export class LoadSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_SUCCESS;

  constructor(public payload: any) { }
}

export class AddAction implements Action {
  readonly type = ActionTypes.ADD;

  constructor(public payload: string) { }
}

export class RemoveAction implements Action {
  readonly type = ActionTypes.REMOVE;

  constructor(public payload: card) { }
}

export class RemoveSuccessAction implements Action {
  readonly type = ActionTypes.REMOVE_SUCCESS;

  constructor(public payload: card) { }
}

export class TogglePinnedAction implements Action {
  readonly type = ActionTypes.TOGGLE_PINNED;

  constructor(public payload: card) { }
}

export class UpdateAction implements Action {
  readonly type = ActionTypes.UPDATE;

  constructor(public payload: any) { }
}

export class UpdateSuccessAction implements Action {
  readonly type = ActionTypes.UPDATE_SUCCESS;

  constructor(public payload: any) { }
}

export class ServerAddSuccessAction implements Action {
  readonly type = ActionTypes.SERVER_ADD_SUCCESS;

  constructor(public payload: any) { }
}

export class ServerFailAction implements Action {
  readonly type = ActionTypes.SERVER_FAIL;

  constructor(public payload: any) { }
}

export class RefreshTokenAction implements Action {
  readonly type = ActionTypes.REFRESH_TOKEN;

  constructor(public payload: any) { }
}
export class RefreshTokenSuccessAction implements Action {
  readonly type = ActionTypes.REFRESH_TOKEN_SUCCESS;

  constructor(public payload: any) { }
}
export class RefreshTokenFailAction implements Action {
  readonly type = ActionTypes.REFRESH_TOKEN_FAIL;

  constructor(public payload: any) { }
}

export class LoadProductsAction implements Action {
  readonly type = ActionTypes.LOAD_PRODUCTS;

  constructor(public payload: any) { }
}
export class LoadProductsSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_PRODUCTS_SUCCESS;

  constructor(public payload: any) { }
}

export class LoadProductAction implements Action {
  readonly type = ActionTypes.LOAD_PRODUCT;

  constructor(public payload: any) { }
}
export class LoadProductSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_PRODUCT_SUCCESS;

  constructor(public payload: any) { }
}

export class LoadCategoriesWithProductsAction implements Action {
  readonly type = ActionTypes.LOAD_CATEGORIES_WITH_PRODUCTS;

  constructor(public payload: any) { }
}
export class LoadCategoriesWithProductsSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_CATEGORIES_WITH_PRODUCTS_SUCCESS;

  constructor(public payload: any) { }
}

export class AddToCartAction implements Action {
  readonly type = ActionTypes.ADD_TO_CART;

  constructor(public payload: product) { }
}

export class RemoveFromCartAction implements Action {
  readonly type = ActionTypes.REMOVE_FROM_CART;

  constructor(public payload: product) { }
}

export class IncreaseCartAction implements Action {
  readonly type = ActionTypes.INCREASE_CART;

  constructor(public payload: product) { }
}

export class DecreaseCartAction implements Action {
  readonly type = ActionTypes.DECREASE_CART;

  constructor(public payload: product) { }
}


export class CheckoutCartAction implements Action {
  readonly type = ActionTypes.CHECKOUT_CART;

  constructor(public payload?: any) { }
}

export class LoginAction implements Action {
  readonly type = ActionTypes.LOGIN;

  constructor(public payload: any) { }
}

export class LoginSuccessAction implements Action {
  readonly type = ActionTypes.LOGIN_SUCCESS;

  constructor(public payload: any) { }
}

export class LogoutAction implements Action {
  readonly type = ActionTypes.LOGOUT;

  constructor(public payload: any) { }
}

export class SignupAction implements Action {
  readonly type = ActionTypes.SIGNUP;

  constructor(public payload: any) { }
}

export class SignupSuccessAction implements Action {
  readonly type = ActionTypes.SIGNUP_SUCCESS;

  constructor(public payload: any) { }
}

export type Actions
  = LoadAction
  | LoadSuccessAction
  | AddAction
  | RemoveAction
  | RemoveSuccessAction
  | TogglePinnedAction
  | UpdateAction
  | UpdateSuccessAction
  | ServerAddSuccessAction
  | ServerFailAction
  | RefreshTokenAction
  | RefreshTokenSuccessAction
  | RefreshTokenFailAction
  | LoadProductsAction
  | LoadProductsSuccessAction
  | LoadProductAction
  | LoadProductSuccessAction
  | LoadCategoriesWithProductsAction
  | LoadCategoriesWithProductsSuccessAction
  | AddToCartAction
  | RemoveFromCartAction
  | IncreaseCartAction
  | DecreaseCartAction
  | CheckoutCartAction
  | LoginAction
  | LoginSuccessAction
  | LogoutAction
  | SignupAction
  | SignupSuccessAction;
