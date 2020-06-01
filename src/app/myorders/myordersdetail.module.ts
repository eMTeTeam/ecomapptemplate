import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MyordersdetailPage } from './myordersdetail.page';

const routes: Routes = [
  {
    path: '',
    component: MyordersdetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    
    RouterModule.forChild(routes)
  ],
  declarations: [MyordersdetailPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyordersdetailPageModule {}
