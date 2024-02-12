import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/Product';
import { Category } from '../models/Category';
import { ProductService } from '../services/product.service';
import { CategoryService } from '../services/category.service';
import { UtilService } from '../services/util.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { Cart } from '../models/Cart';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  @Input() products: Product[] = [];
  categoryParam: String = "all";
  constructor(private authService: AuthService, private productService: ProductService, private utilService: UtilService, 
    private route: ActivatedRoute, private router: Router, private cartService: CartService) { }

  ngOnInit(): void {
    
    this.categoryParam = this.route.snapshot.params['category']
    this.getProducts();
  }

  getProducts() {
    this.productService.getAllProducts(this.categoryParam).subscribe(products => {
      this.products = products;
    })
  }

  formatCurrency(amount: Number) {
    return this.utilService.formatCurrency(amount);
  }

  addToCart(item: Product) {
    var isLoggedIn = this.authService.checkSessionIsAvailable();

    if(isLoggedIn) {
      const cart: Cart = {
        id: item._id,
        price: item.price,
        image: item.image,
        quantity: 1,
        title: item.title,
        categoryName: item.categoryName,
        category: item.category
      }
      this.cartService.addToCart(cart);
      this.router.navigateByUrl('/cart');
    } else {
      this.router.navigateByUrl('/signup');
    }
  }

}
