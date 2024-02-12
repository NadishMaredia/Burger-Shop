import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { CartPageComponent } from './cart-page/cart-page.component';


const routes: Routes = [
  { path: 'home/:category', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'cart', component: CartPageComponent },
  { path: '', redirectTo: '/home/all', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
