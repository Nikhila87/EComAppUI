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
import { CartComponent } from './cart/cart.component';

const routes: Routes = [ 
   { path: 'login', component: LoginComponent},
   { path: 'product', component: ProductComponent},
  //  { path: 'admin', component: AdminDashboardComponent, canActivate: [AuthGuard] },
  // { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  {path:'product/:id',component:ProductDetailComponent},
  {path:'cart',component:CartComponent},
  { path: 'add', component: AddproductComponent, canActivate: [AuthGuard] },
  { path: 'edit', component: EditComponent, canActivate: [AuthGuard] },
  { path: 'delete', component: DeleteComponent, canActivate: [AuthGuard] },
  { path: '', component: ProductComponent, pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
