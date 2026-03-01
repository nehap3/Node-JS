import { Component } from '@angular/core';
import { Category } from './category/category';
import { Product } from './product/product';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Category, Product],
  template: `
    <app-category></app-category>
    <hr>
    <app-product></app-product>
  `
})
export class App {}