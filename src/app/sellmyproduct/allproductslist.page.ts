import { Component, OnInit } from '@angular/core';
import { MenuController, ActionSheetController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { IonSlides } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-allproductslist',
  templateUrl: './allproductslist.page.html',
  styleUrls: ['./allproductslist.page.scss'],
})
export class AllproductslistPage {
  sellmyproductList: any;
  searchQuery: string;
  searchList: any;
  today: any;
  approvedData: any;
  rejectedData: any;
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
    this.sellmyproductList = [
      { name: "Tomoto", quantity: 1,price: "Rs 150/kg", imageurl: "../../assets/products/vegetables/Banana.jpg", description: "Cultivated in Organic field with special type.loper" },
      { name: "Potato", quantity: 1,price: "Rs 50/kg", imageurl: "../../assets/products/vegetables/Beetroot.jpg", description: "Cultivated in Organic field with special type.loper" },
      { name: "Chicken", quantity: 1, price: "Rs 70/kg", imageurl: "../../assets/products/vegetables/Cabbage.jpg", description: "Cultivated in Organic field with special type.loper" },
      { name: "Cosmetics",  quantity: 1, price: "Rs 200/kg", imageurl: "../../assets/products/vegetables/Cherry.jpg", description: "Cultivated in Organic field with special type.loper" },
      { name: "Cloths",  quantity: 1, price: "Rs 300/kg", imageurl: "../../assets/products/vegetables/Tomato.jpg", description: "Cultivated in Organic field with special type.loper" },
     
  ];
    this.searchList = this.sellmyproductList;
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
  goback()
  {
    this.nav.navigateForward("account");
  }
  addNewProduct() {
    this.nav.navigateForward("sellmyproduct");
  }

  viewProduct() {
    this.nav.navigateForward("sellmyproductlist");
  }

  editProduct(item) {
    
  }

  approve(item: any) {
   
  }
  async rejectAlert(item: any) {
   
  }
  reject(itemid: any, rejComments: any) {
   
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
    this.searchList = this.searchValue(this.sellmyproductList, text);
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

  
}
