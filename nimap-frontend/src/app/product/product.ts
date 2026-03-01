import { ChangeDetectorRef, Component } from '@angular/core';
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

  ProductName: string = '';
  CategoryId: number = 0;

  // Pagination
  page: number = 1;
  pageSize: number = 10;
  totalRecords: number = 0;

  // For editing
  editId: number | null = null;
  editProductName: string = '';
  editCategoryId: number = 0;

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) { }

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
      this.cdr.detectChanges();
    });
}
add() {
  if (!this.ProductName.trim() || this.CategoryId === 0) return;

  this.api.addProduct({
    ProductName: this.ProductName,
    CategoryId: this.CategoryId
  }).subscribe(() => {
    this.loadProducts();   // reload current page properly
    this.ProductName = '';
    this.CategoryId = 0;
  });
}

  startEdit(prod: any) {
    this.editId = prod.ProductId;
    this.editProductName = prod.ProductName;
    this.editCategoryId = prod.CategoryId;
  }

saveEdit() {
  if (this.editId == null) return;

  this.api.updateProduct(this.editId, {
    ProductName: this.editProductName,
    CategoryId: this.editCategoryId
  }).subscribe(() => {
    this.editId = null;
    this.loadProducts();
  });
}

  cancelEdit() {
    this.editId = null;
  }

delete(id: number) {
  if (confirm('Delete?')) {
    this.api.deleteProduct(id).subscribe(() => {
      this.loadProducts();
    });
  }
}

  // Pagination helpers
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