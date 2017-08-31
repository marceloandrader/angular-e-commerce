import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NgModuleFactoryLoader, SystemJsNgModuleLoader } from '@angular/core';

import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {reducers, metaReducers} from './reducers/index';
import {StoreModule} from '@ngrx/store';
import {HttpClientModule} from '@angular/common/http';
import {EffectsModule} from '@ngrx/effects';
import {DataEffects} from './effects/data';
import {DataService} from './services/data.service';
import {ToasterModule} from 'angular2-toaster';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { UIRouterModule } from '@uirouter/angular';
import { MAIN_STATES, uiRouterConfigFn } from './app.states';
import {AboutComponent} from './about/about';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryProductCardComponent } from './category-list/category-product-card/category-product-card.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { ProductCardComponent } from './search-results/product-card/product-card.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AddressComponent } from './user-profile/address/address.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ToolbarComponent,
    SearchbarComponent,
    HomeComponent,
    FooterComponent,
    CategoryListComponent,
    CategoryProductCardComponent,
    SearchResultsComponent,
    ProductCardComponent,
    ProductComponent,
    CartComponent,
    LoginComponent,
    SignupComponent,
    UserProfileComponent,
    AddressComponent,
    MyOrdersComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([DataEffects]),
    ToasterModule,
    UIRouterModule.forRoot({
      states: MAIN_STATES,
      useHash: true,
      config: uiRouterConfigFn
    }),
  ],
  providers: [
    DataService,
    { provide: NgModuleFactoryLoader, useClass: SystemJsNgModuleLoader },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
