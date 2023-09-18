import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private url = 'https://fakestoreapi.com/products';
  productsSubject$ = new BehaviorSubject<Product[]>([]);

  constructor(private http: HttpClient) {}
  addProduct(cuurProduct: Product): Observable<Product> {
    return this.http.post<Product>(this.url, cuurProduct).pipe(
        map((products) => {
            cuurProduct.id = this.productsSubject$.value[this.productsSubject$.value.length - 1].id + 1;
          this.productsSubject$.value.push(cuurProduct);
            this.productsSubject$.next(this.productsSubject$.value);
            return products;
        })
      );;
  }
  getProducts(): Observable<Product[]> {
        return this.productsSubject$.asObservable();
    }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.url}/${id}`);
  }

  getProductsFromBE () {
   
    this.http.get<Product[]>(this.url).subscribe((products) => {
            this.productsSubject$.next(products);
        });
    }

    updateProduct(id: number, currProduct: Product): Observable<Product> {
    return this.http.put<Product>(`${this.url}/${id}`, currProduct).pipe(
        map((products) => {
          const indexToAdd = this.productsSubject$.value.findIndex(
            (product) => product.id === currProduct.id
          );
          this.productsSubject$.value[indexToAdd] = currProduct;
            this.productsSubject$.next(this.productsSubject$.value);
            return products;
        })
      );
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.url}/${id}`).pipe(
        map((products) => {
          const indexToRemove = this.productsSubject$.value.findIndex(
            (product) => product.id === id
          );
          this.productsSubject$.value.splice(indexToRemove, 1);
            this.productsSubject$.next(this.productsSubject$.value);
            return products;
        })
      );
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.url}/categories`);
  }

  getAllProductsInCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/category/${category}`);
  }
}
