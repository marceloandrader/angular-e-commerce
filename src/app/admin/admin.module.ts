import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UIRouterModule } from '@uirouter/angular';
import { ADMIN_STATES } from './admin.states';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from "./admin.component";
import { AdminProductsComponent } from "./admin-products/admin-products.component";
import { AdminUsersComponent } from "./admin-users/admin-users.component";
import { AdminCategoriesComponent } from "./admin-categories/admin-categories.component";
import { AdminOrdersComponent } from "./admin-orders/admin-orders.component";

const ADMIN_COMPONENTS =  [
  AdminProductsComponent, AdminComponent, AdminUsersComponent, AdminCategoriesComponent, AdminOrdersComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UIRouterModule.forChild({
      states: ADMIN_STATES,
    }),

  ],
  declarations: ADMIN_COMPONENTS
})
export class AdminModule { }
