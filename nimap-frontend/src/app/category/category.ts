import { ChangeDetectorRef, Component } from '@angular/core';
import { ApiService } from '../services/api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category.html'
})
export class Category {

  categories: any[] = [];
  CategoryName: string = '';

  // For editing
  editId: number | null = null;
  editName: string = '';

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.api.getCategories().subscribe((res: any) => {
      this.categories = res;
      console.log(this.categories); 
      this.cdr.detectChanges();
    });
    console.log('loading')
  }

  add() {
    if (!this.CategoryName.trim()) return;
    this.api.addCategory({ CategoryName: this.CategoryName }).subscribe(() => {
      this.CategoryName = '';
      this.loadCategories();
    });
  }

  startEdit(cat: any) {
    this.editId = cat.CategoryId;
    this.editName = cat.CategoryName;
  }

  saveEdit() {
    if (this.editId == null) return;
    this.api.updateCategory(this.editId, { CategoryName: this.editName }).subscribe(() => {
      this.editId = null;
      this.editName = '';
      this.loadCategories();
    });
  }

  cancelEdit() {
    this.editId = null;
    this.editName = '';
  }

  delete(id: number) {
    if (confirm('Are you sure you want to delete this category?')) {
      this.api.deleteCategory(id).subscribe(() => {
        this.loadCategories();
      });
    }
  }
}