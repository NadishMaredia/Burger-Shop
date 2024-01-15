import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/Product';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/Category';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: Product[] = [];
  categories: Category[] = [];
  constructor(private productService: ProductService, private categoryService: CategoryService, private utilService: UtilService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  getProducts() {
    this.productService.getAllProducts().subscribe(products => {
      this.products = products;
    })
  }

  getCategories() {
    this.categoryService.getAllCategories().subscribe(category => {
      this.categories = category;
    })
  }

  formatCurrency(amount: Number) {
    return this.utilService.formatCurrency(amount);
  }
}
