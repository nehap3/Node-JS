import { Component } from '@angular/core';
import { ApiService } from '../services/api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product.html'
})
export class Product {

  products: any[] = [];
  categories: any[] = [];

  ProductName = '';
  CategoryId = 0;

  page = 1;
  pageSize = 10;
  totalRecords = 0;

  editId: number | null = null;
  editProductName = '';
  editCategoryId = 0;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.loadProducts();
    this.api.getCategories().subscribe((res: any) => {
      this.categories = res;
    });
  }

  loadProducts() {
    this.api.getProducts(this.page, this.pageSize)
      .subscribe((res: any) => {
        this.products = res.data;
        this.totalRecords = res.total;
      });
  }

  add() {
    if (!this.ProductName.trim() || this.CategoryId === 0) return;

    this.api.addProduct({
      ProductName: this.ProductName,
      CategoryId: this.CategoryId
    }).subscribe((res: any) => {

      const category = this.categories.find(c => c.CategoryId == this.CategoryId);

      this.products.unshift({
        ProductId: res.insertId,
        ProductName: this.ProductName,
        CategoryId: this.CategoryId,
        CategoryName: category?.CategoryName
      });

      this.totalRecords++;
      this.ProductName = '';
      this.CategoryId = 0;
    });
  }

  delete(id: number) {
    if (confirm('Delete?')) {
      this.api.deleteProduct(id).subscribe(() => {
        this.products = this.products.filter(p => p.ProductId !== id);
        this.totalRecords--;
      });
    }
  }

  saveEdit() {
    if (this.editId == null) return;

    this.api.updateProduct(this.editId, {
      ProductName: this.editProductName,
      CategoryId: this.editCategoryId
    }).subscribe(() => {

      const category = this.categories.find(c => c.CategoryId == this.editCategoryId);
      const index = this.products.findIndex(p => p.ProductId === this.editId);

      if (index !== -1) {
        this.products[index].ProductName = this.editProductName;
        this.products[index].CategoryId = this.editCategoryId;
        this.products[index].CategoryName = category?.CategoryName;
      }

      this.editId = null;
    });
  }

  get totalPages(): number {
    return Math.ceil(this.totalRecords / this.pageSize);
  }

  next() {
    if (this.page < this.totalPages) {
      this.page++;
      this.loadProducts();
    }
  }

  prev() {
    if (this.page > 1) {
      this.page--;
      this.loadProducts();
    }
  }
}