import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  //{ path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '', loadChildren: './pages/v1/menutabs/menutabs.module#MenutabsPageModule' },

  // Sesudah login
  { path: 'menutabs', loadChildren: './pages/v1/menutabs/menutabs.module#MenutabsPageModule' },
  { path: 'home', loadChildren: './pages/v1/home/home.module#HomePageModule' },
  { path: 'inlaundry', loadChildren: './pages/v1/inlaundry/inlaundry.module#InlaundryPageModule' },
  { path: 'history', loadChildren: './pages/v1/history/history.module#HistoryPageModule' },
  { path: 'account', loadChildren: './pages/v1/account/account.module#AccountPageModule' },
  { path: 'inbox', loadChildren: './pages/v1/inbox/inbox.module#InboxPageModule' },
  { path: 'setlaundry', loadChildren: './pages/v1/setlaundry/setlaundry.module#SetlaundryPageModule' },

  // Sebelum login
  { path: 'intro', loadChildren: './pages/v0/intro/intro.module#IntroPageModule' },
  { path: 'signin', loadChildren: './pages/v0/signin/signin.module#SigninPageModule' },
  { path: 'signup', loadChildren: './pages/v0/signup/signup.module#SignupPageModule' },
  { path: 'activation/:tipe_aktivasi/:kode_aktivasi/:opsi_aktivasi', loadChildren: './pages/v0/activation/activation.module#ActivationPageModule' },
  { path: 'templaundry/:opsi_aktivasi', loadChildren: './pages/v0/templaundry/templaundry.module#TemplaundryPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
