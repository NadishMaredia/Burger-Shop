import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { OrderConfirmComponent } from './order-confirm/order-confirm.component';


const routes: Routes = [
  { path: 'home/:category', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'cart', component: CartPageComponent },
  { path: 'order-confirm', component: OrderConfirmComponent },
  { path: '', redirectTo: '/home/all', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
