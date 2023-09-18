import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared-module/models/product.model';
import { ProductsService } from 'src/app/shared-module/services/products.service';

@Component({
  selector: 'app-login',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class EditProductComponent implements OnInit {
  public productForm: FormGroup = new FormGroup([]);
  public invalidCredentials: boolean = false;
  public hide = true;
  public id: string = '';
  public isAdd: boolean = true;
  error = '';
  currentRole: string = '';
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductsService
  ) {
  }
  public ngOnInit() {
    const id = this.route.snapshot.queryParamMap.get('id');
    this.productForm = this.formBuilder.group({
      category: ['', Validators.required],
      description: ['', Validators.required],
      id: [{value: '', disabled: true} ],
      image: ['', Validators.required],
      title: ['', Validators.required],
      price: ['', Validators.required],
    });
    if (id) {
      this.isAdd = false;
      this.productService.getProduct(id).subscribe((product) => {
        console.log(product);
        
      this.productForm.controls['category'].setValue(product.category);
      this.productForm.controls['description'].setValue(product.description);
      this.productForm.controls['id'].setValue(product.id);
      this.productForm.controls['image'].setValue(product.image);
      this.productForm.controls['title'].setValue(product.title);
      this.productForm.controls['price'].setValue(product.price);
      })
    } 
  }

  public submitData() {
    if (this.isAdd) {
      const data = this.productForm.getRawValue() as Product;
      this.productService.addProduct(data).subscribe((res) => {
        this.router.navigate(['/'])
      })
    } else {
      const data = this.productForm.getRawValue() as Product;
      this.productService.updateProduct(data.id , data).subscribe((res) => {
        this.router.navigate(['/'])
      })

    }
  }
}
