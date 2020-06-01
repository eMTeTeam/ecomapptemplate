import { Component, OnInit } from '@angular/core';
import { MenuController, ActionSheetController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { IonSlides } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { formatDate } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-myordersdetail',
  templateUrl: './myordersdetail.page.html',
  styleUrls: ['./myordersdetail.page.scss'],
})
export class MyordersdetailPage {
  sellmyproductList: any;
  searchQuery: string;
  searchList: any;
  currentDate: any;
  today: any;
  rate: any;
  comments: any;
  reviewData: any;
  selectedItem: any;
  sellerId: any;
  constructor(
    private menu: MenuController,
    private route: ActivatedRoute,
    private router: Router,
    public loadingController: LoadingController,
    public actionSheetController: ActionSheetController,
    private alertCtrl: AlertController,
    public nav: NavController
  ) {
    var curreDate = new Date();
    var curdate = curreDate.toLocaleDateString();
    this.currentDate = curdate;
   
        this.selectedItem = [
          { eta: null,
            id: "20442731-1957-42cb-b4e2-53c856321ce3",
            orderedDate: "2020-05-30T15:57:22.17108+00:00",
            otp: null,
            price: 30,
            productId: "af6142b8-0db3-4acb-a2d1-657bbf36eef7",
            productName: "Cherry",
            quantity: 2,
            seller: "Seller1",
            status: "Seller Delivered" },

            { eta: null,
              id: "20442731-1957-42cb-b4e2-53c856321ce3",
              orderedDate: "2020-05-30T15:57:22.17108+00:00",
              otp: null,
              price: 30,
              productId: "af6142b8-0db3-4acb-a2d1-657bbf36eef7",
              productName: "Cherry",
              quantity: 2,
              seller: "Seller1",
              status: "Approval Pending" },
        ]
    this.presentLoading();
    
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
  goBack()
  {
    this.nav.navigateForward("myorders");
  }
}
