import { Routes } from '@angular/router';
import { HomeComponent } from './pages/main/home/home.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { MainLayoutComponent } from './components/layout/main-layout/main-layout.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ClientAuthGuard } from './shared/services/AuthGuards/client.auth.guard';
import { AdminAuthGuard } from './shared/services/AuthGuards/admin.auth.guard';
import { VendedorPageComponent } from './pages/vendedor/vendedor-page/vendedor-page.component';
import { VendedorAuthGuard } from './shared/services/AuthGuards/vendedor.auth.guard';
import { ProductCreateComponent } from './pages/vendedor/product-create/product-create.component';
import { CategoryCreateComponent } from './pages/vendedor/category-create/category-create.component';
import { AdminLayoutComponent } from './components/layout/admin-layout/admin-layout.component';
import { ReadComponent } from './pages/admin/userManagement/read/read.component';
import { UpdateComponent } from './pages/admin/userManagement/update/update.component';
import { ProductUpdateComponent } from './pages/vendedor/product-update/product-update.component';
import { BuyComponent } from './pages/main/buy/buy.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [ClientAuthGuard],
      },
      {
        path:'buy/:id',
        component: BuyComponent,
        canActivate: [ClientAuthGuard],

      },
      {
        path: 'vendedor',
        component: VendedorPageComponent,
        canActivate: [VendedorAuthGuard],
      },
      {
        path: 'vendedor/criarProduto',
        component: ProductCreateComponent,
        canActivate: [VendedorAuthGuard],
      },
      {
        path: 'vendedor/editarProduto/:id',
        component: ProductUpdateComponent,
        canActivate: [VendedorAuthGuard],
      },
    ],
  },
  {
    path: 'vendedor/criarProduto/novaCategoria',
    component: CategoryCreateComponent,
    canActivate: [VendedorAuthGuard],
  },
  {
    path:'admin',
    component:AdminLayoutComponent,
    children:[
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AdminAuthGuard],
      },
      {
        path:'users',
        component:ReadComponent,
        canActivate: [AdminAuthGuard],
      },
      {
        path:'users/update/:id',
        component:UpdateComponent,
        canActivate: [AdminAuthGuard],
      }
      
    
    ]
  }

];
