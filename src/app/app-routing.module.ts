import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product/product.component';
import { RegisterComponent } from './register/register.component';
// import { ProductDetailComponent } from './product-detail/product-detail.component';
import { AddproductComponent} from './addproduct/addproduct.component';
import { EditComponent } from './edit/edit.component';
import { AdminRoleGuard } from './auth/admin-role.guard';
import { DeleteComponent } from './delete/delete.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfirmemailComponent } from './confirmemail/confirmemail.component';
import { CartComponent } from './cart/cart.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import {UseraddressComponent} from './useraddress/useraddress.component';
import { AddresspageComponent } from './addresspage/addresspage.component';
import { PaymentComponent } from './payment/payment.component';
import { SuccessComponent } from './success/success.component';
import { OrdersComponent } from './orders/orders.component';
const routes: Routes = [ 
   { path: 'login', component: LoginComponent},
   { path: 'product', component: ProductComponent},
  { path: 'search/:name', component: ProductComponent } ,
{path:'myorders',component:OrdersComponent},
  { path: 'register', component: RegisterComponent },
  {path:'product/:id',component:ProductDetailComponent},
  {path:'cart',component:CartComponent},
  { path: 'add', component: AddproductComponent, canActivate: [AuthGuard] },
  { path: 'edit', component: EditComponent, canActivate: [AuthGuard] },
  { path: 'delete', component: DeleteComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent },
{ path: 'reset-password', component: ResetPasswordComponent },
{ path: 'confirm-email', component: ConfirmemailComponent },
{ path: 'my-addresses', component: UseraddressComponent },
{ path: 'addresspage', component: AddresspageComponent },
{path:'paymentpage',component:PaymentComponent},
{path:'payment-success',component:SuccessComponent},
  { path: '', component: ProductComponent, pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
