import { Component, OnInit } from '@angular/core';
import { MenuController, ActionSheetController, LoadingController, AlertController, NavController } from '@ionic/angular';


@Component({
  selector: 'app-addresslist',
  templateUrl: './addresslist.page.html',
  styleUrls: ['./addresslist.page.scss'],
})
export class AddresslistPage {

  addressList: any;
  searchList: any;
  noRecords: boolean = true;

  constructor(private menu: MenuController,
    
    public loadingController: LoadingController,
    public actionSheetController: ActionSheetController,
    public nav: NavController) {
    this.presentLoading();
    
    this.searchList = [
      { addressLine1: "addressLine1", addressLine2: "addrer", addressType: "Home", city: "Che", country: "Ind", isDefault: true, lattitude: "12.343", longitude: "12.1232", state: "Tamil", zip: "1234" },
      
    ];
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading..',
      duration: 1000
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  addNewAddress() {
    this.nav.navigateForward("address");
  }

  goBack() {
    this.nav.navigateForward("account");
  }

  editAddress() {

  }

 

}
