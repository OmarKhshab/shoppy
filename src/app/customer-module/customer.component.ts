import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../shared-module/services/products.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {
  
  public categories: string[] = [];
  constructor (private productsService: ProductsService) {
  }
  public ngOnInit() {
    this.productsService.getCategories().subscribe((categories)=>{
      this.categories = categories;
    })
  }

}
