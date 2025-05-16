import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProductComponent } from './product/product.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DeleteComponent } from './delete/delete.component';
import { EditComponent } from './edit/edit.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { MatMenuModule } from '@angular/material/menu';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { CartComponent } from './cart/cart.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ConfirmemailComponent } from './confirmemail/confirmemail.component';
import { UseraddressComponent } from './useraddress/useraddress.component';
import { AddresspageComponent } from './addresspage/addresspage.component';
import { PaymentComponent } from './payment/payment.component';
import { SuccessComponent } from './success/success.component';
import { OrdersComponent } from './orders/orders.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileComponent } from './profile/profile.component';
import { AddresslistComponent } from './addresslist/addresslist.component';
import { MatExpansionModule } from '@angular/material/expansion';
@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    
    LoginComponent,
    RegisterComponent,
    DeleteComponent,
    EditComponent,
    AddproductComponent,
    ProductDetailComponent,
    CartComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ConfirmemailComponent,
    UseraddressComponent,
    AddresspageComponent,
    PaymentComponent,
    SuccessComponent,
    OrdersComponent,
    ProfileComponent,
    AddresslistComponent
    
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    MatExpansionModule,
    AppRoutingModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatTableModule,
    MatInputModule,
    NgbModule,
   MatMenuModule,
    ToastrModule.forRoot(),
  ],
   providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
