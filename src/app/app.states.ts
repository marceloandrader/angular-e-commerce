import { Ng2StateDeclaration, UIRouter } from '@uirouter/angular';
import {AboutComponent} from './about/about';
import { Injector } from '@angular/core';
import {HomeComponent} from './home/home.component';
import {SearchResultsComponent} from "./search-results/search-results.component";
import {ProductComponent} from "./product/product.component";
import {CartComponent} from "./cart/cart.component";
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {UserProfileComponent} from "./user-profile/user-profile.component";
import {MyOrdersComponent} from "./my-orders/my-orders.component";
import {DataService} from "./services/data.service";

/** UIRouter Config  */
export function uiRouterConfigFn(router: UIRouter, injector: Injector) {
  router.urlService.rules.otherwise({ state: 'home' });
}

export function loadProducts(transition) {
  const dataSvc = transition.injector().get(DataService);

  dataSvc.dispatchLoadProducts({
    query: transition.params().query,
    category: transition.params().category
  });
}

export function loadProduct(transition) {
  const dataSvc = transition.injector().get(DataService);

  dataSvc.dispatchLoadProduct(transition.params().productId);
}

export function loadCategoriesWithProducts(transition) {
  const dataSvc = transition.injector().get(DataService);

  dataSvc.dispatchLoadCategoriesWithProducts();
}

export let MAIN_STATES: Ng2StateDeclaration[] = [
  { name: 'login', url: '/login',  component: LoginComponent },
  { name: 'signup', url: '/signup',  component: SignupComponent},
  { name: 'user-profile', url: '/user-profile',  component: UserProfileComponent},
  { name: 'my-orders', url: '/my-orders',  component: MyOrdersComponent},
  { name: 'about', url: '/about',  component: AboutComponent },
  { name: 'home', url: '/home', component: HomeComponent, onEnter: loadCategoriesWithProducts},
  { name: 'search', url: '/search?query&category', component: SearchResultsComponent, onEnter: loadProducts},
  { name: 'product', url: '/product/:productId', component: ProductComponent, onEnter: loadProduct},
  { name: 'cart', url: '/cart', component: CartComponent},
  { name: 'cards.**',
    url: '/cards',
    loadChildren: './cards/cards.module#CardsModule'
  },
  // { name: 'user.**',
  //   url: '/user',
  //   loadChildren: './user/user.module#UserModule'
  // },
];
