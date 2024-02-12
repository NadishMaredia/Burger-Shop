import { Component, OnInit } from '@angular/core';
import { Category } from '../models/Category';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  categories: Category[] = [];
  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getAllCategories().subscribe(category => {
      this.categories = category;
    })
  }

}
