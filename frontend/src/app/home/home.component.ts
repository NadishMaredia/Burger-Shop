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

  constructor(private utilService: UtilService) { }

  ngOnInit(): void {
  }
}
