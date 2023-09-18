import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '../shared-module/models/product.model';
import { ProductsService } from '../shared-module/services/products.service';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent  implements AfterViewInit {
  products: Product[] = [];
  currentProduct!: Product;
  displayedColumns: string[] = ['category', 'id', 'price', 'title'];
  displayedColumnsWithActionAndImage: string[] = ['category', 'id', 'price', 'title', 'image', 'actions'];
  dataSource!: MatTableDataSource<Product>;
  dialogRef: any;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  public constructor(private productService: ProductsService, private dialog: MatDialog , private router: Router, private cdref: ChangeDetectorRef) {
  }
  ngAfterViewInit() {
    
    this.productService.getProducts().subscribe((products) => {
      if (products.length == 0) {
        this.productService.getProductsFromBE();
      } else {
        this.products= products;
        this.dataSource =  new MatTableDataSource(products);
        this.dataSource.paginator = this.paginator;
        this.cdref.detectChanges();
      }
      
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  handleEdit(element: Product) {
    const queryParams = { id: element.id };
    this.router.navigate(['/admin/product'], { queryParams });
  }
  handleDelete( el: any, product: Product): void {
    this.currentProduct = product;
    this.dialogRef = this.dialog.open(el);
  }
  onCancelDelete() {
    this.dialogRef.close();
  }
  addProduct() {
    this.router.navigate(['/admin/product']);
  }
  onConfirmDelete() {
      this.productService.deleteProduct(this.currentProduct.id).subscribe((res) => {
        this.dialogRef.close();
      });
  }
}
