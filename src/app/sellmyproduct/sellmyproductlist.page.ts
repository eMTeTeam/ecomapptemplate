import { Component, OnInit } from '@angular/core';
import { MenuController, ActionSheetController, LoadingController, NavController, AlertController, ModalController } from '@ionic/angular';
import { IonSlides } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { formatDate } from '@angular/common';
import { ReviewModalPage } from 'src/app/sellmyproduct/review-modal/review-modal.page'

@Component({
  selector: 'app-sellmyproductlist',
  templateUrl: './sellmyproductlist.page.html',
  styleUrls: ['./sellmyproductlist.page.scss'],
})
export class SellmyproductlistPage {
  sellmyproductList: any;
  searchQuery: string;
  searchList: any;
  currentDate: any;
  today: any;
  approvedData: any;
  rejectedData: any;
  show:boolean = false;
  constructor(
    private menu: MenuController,
    public loadingController: LoadingController,
    public actionSheetController: ActionSheetController,
    private alertCtrl: AlertController,
    public modalController: ModalController,
    public nav: NavController
  ) {
    var curreDate = new Date();
    var curdate = curreDate.toLocaleDateString();
    this.currentDate = curdate;
    this.presentLoading();
    this.sellmyproductList = [
      {
        firstName: "buyer1",
        lastName: "buyer1",
        userId: "112516075075148231384",
        imageurl: "../../assets/products/vegetables/Cherry.jpg",
        eta: null,
        id: "20442731-1957-42cb-b4e2-53c856321ce3",
        orderedDate: "2020-05-30T15:57:22.17108+00:00",
        price: 30,
        productId: "af6142b8-0db3-4acb-a2d1-657bbf36eef7",
        productName: "Cherry",
        quantity: 2,
        status: "Approval Pending"
      },
      {
        firstName: "buyer2",
        lastName: "buyer2",
        userId: "112516075075148231384",
        imageurl: "../../assets/products/vegetables/Cherry.jpg",
        eta: null,
        id: "20442731-1957-42cb-b4e2-53c856321ce3",
        orderedDate: "2020-05-30T15:57:22.17108+00:00",
        price: 30,
        productId: "af6142b8-0db3-4acb-a2d1-657bbf36eef7",
        productName: "Cherry",
        quantity: 2,
        status: "Accepted"
      }
  ];
    this.searchList = this.sellmyproductList;
    // this.today = Date.now();
    this.today = formatDate(new Date(), 'yyyy-MM-dd', 'en');

  }
  async sllerreviewAlert(item: any) {
    let modal = await this.modalController.create({
      component: ReviewModalPage,
      cssClass: 'my-custom-modal-css'
    });
    modal.onWillDismiss().then((data) => {

    });
    modal.present();

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
    this.nav.navigateForward("allproductslist");
  }
  
}
