import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from  '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor } from './interceptor/jwtInterceptor';
import { SnotifyService, ToastDefaults } from 'ng-snotify';
import { NotificationService } from './services/notification.service';
import { SignupComponent } from './signup/signup.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { OrderConfirmationModalComponent } from './order-confirmation-modal/order-confirmation-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    SignupComponent,
    ProductItemComponent,
    SideNavComponent,
    CartPageComponent,
    OrderConfirmationModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
    SnotifyService,
    NotificationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
