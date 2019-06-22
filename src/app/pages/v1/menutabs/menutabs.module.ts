import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MenutabsPage } from './menutabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: MenutabsPage,
    children:[
        { path: 'tab1', loadChildren: '../home/home.module#HomePageModule' },
        { path: 'tab2', loadChildren: '../inlaundry/inlaundry.module#InlaundryPageModule' },
        { path: 'tab3', loadChildren: '../history/history.module#HistoryPageModule' },
        { path: 'tab4', loadChildren: '../account/account.module#AccountPageModule' },
    ]
  },
  {
    path:'',
    redirectTo:'/tabs/tab1',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenutabsPage]
})
export class MenutabsPageModule {}
