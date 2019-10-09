import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
//  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'dashboard', loadChildren: './pages/dashboard/dashboard.module#DashboardPageModule' },
  { path: 'contact', loadChildren: './pages/contact/contact.module#ContactPageModule' },
  { path: 'details', loadChildren: './pages/product/details/details.module#DetailsPageModule' },
  { path: 'details/:id', loadChildren: './pages/product/details/details.module#DetailsPageModule' },
  { path: 'product', loadChildren: './pages/product/product.module#ProductPageModule' },
  { path: 'professional', loadChildren: './pages/professional/professional.module#ProfessionalPageModule' },
  { path: 'client', loadChildren: './pages/client/client.module#ClientPageModule' },
  { path: 'edit-profile', loadChildren: './pages/edit-profile/edit-profile.module#EditProfilePageModule' },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
