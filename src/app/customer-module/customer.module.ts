import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared-module/shared.module';
import { CustomerComponent } from './customer.component';
import { CustomerRoutingModule } from './customer-routing.module';
import { ProductListComponent } from './products-list/product-list.component';



@NgModule({
  declarations: [
    CustomerComponent,
    ProductListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CustomerRoutingModule,
  ],
  exports: [
    CustomerComponent,
    ProductListComponent,
  ]
})
export class CustomerModule { }
