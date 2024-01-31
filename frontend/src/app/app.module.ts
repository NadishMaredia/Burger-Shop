import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from  '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor } from './interceptor/jwtInterceptor';
import { SnotifyService, ToastDefaults } from 'ng-snotify';
import { NotificationService } from './services/notification.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule
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
