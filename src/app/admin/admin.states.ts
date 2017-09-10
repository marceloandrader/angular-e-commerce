import { Ng2StateDeclaration } from '@uirouter/angular';
import { DataService } from "../services/data.service";
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AdminComponent } from './admin.component';
import { AdminCategoriesComponent } from "./admin-categories/admin-categories.component";
import { AdminUsersComponent } from "./admin-users/admin-users.component";

export function loadProducts(transition) {
  let dataSvc = transition.injector().get(DataService);

  dataSvc.dispatchLoadProducts({});
}

export function loadCategories(transition) {
  let dataSvc = transition.injector().get(DataService);

  dataSvc.dispatchLoadCategories({});
}

export function loadUsers(transition) {
  let dataSvc = transition.injector().get(DataService);

  dataSvc.dispatchLoadUsers({});
}

export let ADMIN_STATES: Ng2StateDeclaration[] = [
  {
    name: 'admin',
    url: '/admin',
    component: AdminComponent
  },
  {
    name: 'admin-categories',
    url: '/admin/categories',
    component: AdminCategoriesComponent,
    onEnter: loadCategories
  },
  {
    name: 'admin-products',
    url: '/admin/products',
    component: AdminProductsComponent,
    onEnter: loadProducts
  },
  {
    name: 'admin-users',
    url: '/admin/users',
    component: AdminUsersComponent,
    onEnter: loadUsers
  }
];
