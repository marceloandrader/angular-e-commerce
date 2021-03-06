import { Action } from '@ngrx/store';
import { type } from '../util';
import {card} from '../models/card';
import {cart} from '../models/cart';
import {product} from "../models/product";
import {order} from "../models/order";
import {user} from "../models/user";

export const ActionTypes = {
  SERVER_FAIL: type('[Data] Server Failure'),
  LOAD_PRODUCTS: type('[Data] Load products'),
  LOAD_PRODUCTS_SUCCESS: type('[Data] Load products Success'),
  LOAD_PRODUCT: type('[Data] Load product'),
  LOAD_PRODUCT_SUCCESS: type('[Data] Load product Success'),
  LOAD_CATEGORIES_WITH_PRODUCTS: type('[Data] Load categories with products'),
  LOAD_CATEGORIES_WITH_PRODUCTS_SUCCESS: type('[Data] Load categories with products Success'),
  ADD_TO_CART: type('[Data] Add to Cart'),
  REMOVE_FROM_CART: type('[Data] Remove from Cart'),
  INCREASE_CART: type('[Data] Increase qty on product from cart'),
  DECREASE_CART: type('[Data] Decrease qty on product from cart'),
  CHECKOUT_CART: type('[Data] Proceed to checkout the cart'),
  CHECKOUT_CART_SUCCESS: type('[Data] Checkout the cart succeeded'),
  LOGIN: type('[Data] Login'),
  LOGIN_SUCCESS: type('[Data] Login succeeded'),
  LOGOUT: type('[Data] Logout'),
  SIGNUP: type('[Data] Signup'),
  SIGNUP_SUCCESS: type('[Data] Signup succeeded'),
  LOAD_ORDERS: type('[Data] Load orders'),
  LOAD_ORDERS_SUCCESS: type('[Data] Load orders Success'),
  LOAD_CATEGORIES_SUCCESS: type('[Data] Load categories Success'),
  LOAD_USERS: type('[Data] Load users'),
  LOAD_USERS_SUCCESS: type('[Data] Load users Success'),
  SAVE_PRODUCT: type('[Data] Save a product'),
  SAVE_PRODUCT_SUCCESS: type('[Data] Save product Success'),
  DELETE_PRODUCT: type('[Data] Delete a product'),
  DELETE_PRODUCT_SUCCESS: type('[Data] Delete product Success'),
  LOAD_CATEGORIES: type('[Data] Load categories'),
  LOAD_SYSTEM_ORDERS: type('[Data] Load system orders'),
  LOAD_SYSTEM_ORDERS_SUCCESS: type('[Data] Load system orders Success'),
  DELETE_ORDER: type('[Data] Delete an order'),
  DELETE_ORDER_SUCCESS: type('[Data] Delete order Success'),
  SHIP_ORDER: type('[Data] Ship an order'),
  SHIP_ORDER_SUCCESS: type('[Data] Ship order Success'),
  SAVE_USER: type('[Data] Save a user'),
  SAVE_USER_SUCCESS: type('[Data] Save user Success'),
  DELETE_USER: type('[Data] Delete a user'),
  DELETE_USER_SUCCESS: type('[Data] Delete user Success'),
};

export class ServerFailAction implements Action {
  readonly type = ActionTypes.SERVER_FAIL;

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

  constructor(public payload: cart) { }
}

export class CheckoutCartSuccessAction implements Action {
  readonly type = ActionTypes.CHECKOUT_CART_SUCCESS;

  constructor(public payload: any) { }
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

export class LoadOrdersAction implements Action {
  readonly type = ActionTypes.LOAD_ORDERS;

  constructor(public payload: any) { }
}
export class LoadOrdersSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_ORDERS_SUCCESS;

  constructor(public payload: any) { }
}


export class LoadCategoriesAction implements Action {
  readonly type = ActionTypes.LOAD_CATEGORIES;

  constructor(public payload: any) { }
}
export class LoadCategoriesSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_CATEGORIES_SUCCESS;

  constructor(public payload: any) { }
}


export class LoadUsersAction implements Action {
  readonly type = ActionTypes.LOAD_USERS;

  constructor(public payload: any) { }
}
export class LoadUsersSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_USERS_SUCCESS;

  constructor(public payload: any) { }
}

export class SaveProductAction implements Action {
  readonly type = ActionTypes.SAVE_PRODUCT;

  constructor(public payload: product) { }
}
export class SaveProductSuccessAction implements Action {
  readonly type = ActionTypes.SAVE_PRODUCT_SUCCESS;

  constructor(public payload: any) { }
}

export class DeleteProductAction implements Action {
  readonly type = ActionTypes.DELETE_PRODUCT;

  constructor(public payload: product) { }
}
export class DeleteProductSuccessAction implements Action {
  readonly type = ActionTypes.DELETE_PRODUCT_SUCCESS;

  constructor(public payload: any) { }
}

export class LoadSystemOrdersAction implements Action {
  readonly type = ActionTypes.LOAD_SYSTEM_ORDERS;

  constructor(public payload: any) { }
}
export class LoadSystemOrdersSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_SYSTEM_ORDERS_SUCCESS;

  constructor(public payload: any) { }
}

export class DeleteOrderAction implements Action {
  readonly type = ActionTypes.DELETE_ORDER;

  constructor(public payload: order) { }
}
export class DeleteOrderSuccessAction implements Action {
  readonly type = ActionTypes.DELETE_ORDER_SUCCESS;

  constructor(public payload: any) { }
}

export class ShipOrderAction implements Action {
  readonly type = ActionTypes.SHIP_ORDER;

  constructor(public payload: product) { }
}
export class ShipOrderSuccessAction implements Action {
  readonly type = ActionTypes.SHIP_ORDER_SUCCESS;

  constructor(public payload: any) { }
}

export class SaveUserAction implements Action {
  readonly type = ActionTypes.SAVE_USER;

  constructor(public payload: user) { }
}
export class SaveUserSuccessAction implements Action {
  readonly type = ActionTypes.SAVE_USER_SUCCESS;

  constructor(public payload: any) { }
}

export class DeleteUserAction implements Action {
  readonly type = ActionTypes.DELETE_USER;

  constructor(public payload: user) { }
}
export class DeleteUserSuccessAction implements Action {
  readonly type = ActionTypes.DELETE_USER_SUCCESS;

  constructor(public payload: any) { }
}

export type Actions
  = ServerFailAction
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
  | CheckoutCartSuccessAction
  | LoginAction
  | LoginSuccessAction
  | LogoutAction
  | SignupAction
  | SignupSuccessAction
  | LoadOrdersAction
  | LoadOrdersSuccessAction
  | LoadCategoriesAction
  | LoadCategoriesSuccessAction
  | LoadUsersAction
  | LoadUsersSuccessAction
  | SaveProductAction
  | SaveProductSuccessAction
  | DeleteProductAction
  | DeleteProductSuccessAction
  | LoadSystemOrdersAction
  | LoadSystemOrdersSuccessAction
  | DeleteOrderAction
  | DeleteOrderSuccessAction
  | ShipOrderAction
  | ShipOrderSuccessAction
  | SaveUserAction
  | SaveUserSuccessAction
  | DeleteUserAction
  | DeleteUserSuccessAction;
