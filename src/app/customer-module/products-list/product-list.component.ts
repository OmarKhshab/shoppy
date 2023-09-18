import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/shared-module/models/product.model';
import { ProductsService } from '../../shared-module/services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {

    
  @Input() category: string = "";
  public isloading: boolean = true;;
  public products: Product[] = [];
  constructor (private productsService: ProductsService) {
  }
  public ngOnInit() {
    this.productsService.getAllProductsInCategory(this.category).subscribe((products)=> {
        this.products = products;
        this.isloading = false;
    })
  }

}
