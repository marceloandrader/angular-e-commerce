import { Ng2StateDeclaration, UIRouter } from '@uirouter/angular';
import {AboutComponent} from './about/about';
import { Injector } from '@angular/core';
import {HomeComponent} from './home/home.component';
import {SearchResultsComponent} from "./search-results/search-results.component";
import {ProductComponent} from "./product/product.component";
import {CartComponent} from "./cart/cart.component";
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";

/** UIRouter Config  */
export function uiRouterConfigFn(router: UIRouter, injector: Injector) {
  router.urlService.rules.otherwise({ state: 'home' });
}

export let MAIN_STATES: Ng2StateDeclaration[] = [
  { name: 'login', url: '/login',  component: LoginComponent },
  { name: 'signup', url: '/signup',  component: SignupComponent},
  { name: 'about', url: '/about',  component: AboutComponent },
  { name: 'home', url: '/home', component: HomeComponent},
  { name: 'search', url: '/search', component: SearchResultsComponent},
  { name: 'product', url: '/product', component: ProductComponent},
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
