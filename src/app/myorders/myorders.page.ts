import { Component, OnInit } from '@angular/core';
import { MenuController, ActionSheetController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { IonSlides } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.page.html',
  styleUrls: ['./myorders.page.scss'],
})
export class MyordersPage {
  productList: any;
  searchQuery: string;
  searchList: any;
  today: any;
  savedData: any = "";
 // isDisabledPrice: boolean = true;
  price: string;
  constructor(
    private menu: MenuController,
    
    public loadingController: LoadingController,
    public actionSheetController: ActionSheetController,
    private alertCtrl: AlertController,
    public nav: NavController
  ) { 
    this.presentLoading();
  
    this.searchList = [
      {
      eta: "2020-05-30T07:00:00+00:00",
      id: "08d0baa7-a41a-461e-8640-0a0d25cedc1c",
      orderedDate: "2020-05-30T15:57:22.171074+00:00",
      otp: 6488,
      price: 100,
      productId: "450404b8-55e1-4e12-a5d3-fe9ee85123ce",
      productName: "Cherry",
      quantity: 2,
      seller: "Seller1",
      status: "Seller Delivered"
      },
      {
        eta: "2020-05-30T07:00:00+00:00",
        id: "08d0baa7-a41a-461e-8640-0a0d25cedc1c",
        orderedDate: "2020-05-30T15:57:22.171074+00:00",
        otp: 6488,
        price: 100,
        productId: "450404b8-55e1-4e12-a5d3-fe9ee85123ce",
        productName: "Cherry",
        quantity: 2,
        seller: "Seller1",
        status: "Seller Delivered"
        },
        {
          eta: "2020-05-30T07:00:00+00:00",
          id: "08d0baa7-a41a-461e-8640-0a0d25cedc1c",
          orderedDate: "2020-05-30T15:57:22.171074+00:00",
          otp: 6488,
          price: 100,
          productId: "450404b8-55e1-4e12-a5d3-fe9ee85123ce",
          productName: "Cherry",
          quantity: 2,
          seller: "Seller1",
          status: "Seller Delivered"
          },
          {
            eta: "2020-05-30T07:00:00+00:00",
            id: "08d0baa7-a41a-461e-8640-0a0d25cedc1c",
            orderedDate: "2020-05-30T15:57:22.171074+00:00",
            otp: 6488,
            price: 100,
            productId: "450404b8-55e1-4e12-a5d3-fe9ee85123ce",
            productName: "Cherry",
            quantity: 2,
            seller: "Seller1",
            status: "Seller Delivered"
            },
  ];
    // this.today = Date.now();
    this.today = formatDate(new Date(), 'yyyy-MM-dd', 'en');
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

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      mode: 'ios',
      buttons: [{
        text: 'Cart',
        icon: 'cart',
        handler: () => {
          this.openCartPage();
        }
      }, {
        text: 'Purchase',
        icon: 'pricetags',
        handler: () => {
          console.log('Play clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    autoplay: true
  };
  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  searchValue(value: any, args?: any): any {

    if (!value) return null;
    if (!args) return value;

    args = args.toLowerCase();

    return value.filter(function (item) {
      return JSON.stringify(item).toLowerCase().includes(args);
    });
  }

  searchText(text) {
    this.searchList = this.searchValue(this.productList, text);
  }

  slidesDidLoad(slides: IonSlides) {
    slides.startAutoplay();
  }

  openListPage() {
    this.nav.navigateForward("home");
  }

  openCartPage() {
    this.nav.navigateForward("cart");
  }

  openAccountPage() {
    this.nav.navigateForward("account");
  }
  goBack()
  {
    this.nav.navigateForward("account");
  }
  viewOrders()
  {
    this.nav.navigateForward("myordersdetail");
  }

}