import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/Product';
import { Category } from '../models/Category';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { UtilService } from '../services/util.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() products: Product[] = [];
  constructor(private productService: ProductService, private utilService: UtilService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getAllProducts().subscribe(products => {
      this.products = products;
    })
  }

  formatCurrency(amount: Number) {
    return this.utilService.formatCurrency(amount);
  }

}
