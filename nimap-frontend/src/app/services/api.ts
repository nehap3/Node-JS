import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  // ---- Category ----
  getCategories() {
    return this.http.get(this.baseUrl + "/categories");
  }

  addCategory(data: any) {
    return this.http.post(this.baseUrl + "/categories", data);
  }

  updateCategory(id: number, data: any) {
    return this.http.put(this.baseUrl + "/categories/" + id, data);
  }

  deleteCategory(id: number) {
    return this.http.delete(this.baseUrl + "/categories/" + id);
  }

  // ---- Product ----
  getProducts(page: number, pageSize: number) {
    return this.http.get(`${this.baseUrl}/products?page=${page}&pageSize=${pageSize}`);
  }

  addProduct(data: any) {
    return this.http.post(this.baseUrl + "/products", data);
  }

  updateProduct(id: number, data: any) {
    return this.http.put(this.baseUrl + "/products/" + id, data);
  }

  deleteProduct(id: number) {
    return this.http.delete(this.baseUrl + "/products/" + id);
  }
}