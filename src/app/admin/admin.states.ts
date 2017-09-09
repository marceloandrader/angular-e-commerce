import { Ng2StateDeclaration } from '@uirouter/angular';
import { DataService } from "../services/data.service";
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AdminComponent } from './admin.component';

export function loadProducts(transition) {
  let dataSvc = transition.injector().get(DataService);

  dataSvc.dispatchLoadProducts({});
}

export let ADMIN_STATES: Ng2StateDeclaration[] = [
  {
    name: 'admin',
    url: '/admin',
    component: AdminComponent
  },
  {
    name: 'admin-products',
    url: '/admin/products',
    component: AdminProductsComponent,
    onEnter: loadProducts
  },
];
