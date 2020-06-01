import { Component, ViewChild, ElementRef } from '@angular/core';
import { MenuController, ActionSheetController, LoadingController, NavController, AlertController, ModalController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-sellerproductlist',
  templateUrl: './sellerproductlist.page.html',
  styleUrls: ['./sellerproductlist.page.scss'],
})
export class SellerproductlistPage {
  cart: any;
  products: any;
  //cartItemCount: BehaviorSubject<number>;
  cartItemCount: any;
  productList: any;
  categoryList: any;
  searchQuery: string;
  searchList: any;
  selectedProduct: any;
  quantity: any;
  sortbyPrice: any;
  today: any;
  hideMe: boolean;
  minPrice: any;
  maxPrice: any;
  basketData: any = "";
  price: any;
  userId: any;
  @ViewChild('cart', { static: false, read: ElementRef }) fab: ElementRef;

  constructor(private menu: MenuController,
    private route: ActivatedRoute,
    private router: Router,
    public loadingController: LoadingController,
    private modalCtrl: ModalController,
    public actionSheetController: ActionSheetController,
    private alertCtrl: AlertController,
    public nav: NavController, ) {
    this.presentLoading();
    this.today = Date.now();
    this.productList = [
      { 
        name: "Cherry", 
        availableOn: "2020-05-30T02:28:02.179+00:00",
        basePrice: 90,
       distance: 30, 
       numberOfRatings: 3,
       price: 90,
       quantity: 6,
       rating: 5,
        imageurl: "../../assets/vegetables/Cherry.jpg",
        firstName: "Seller Name" 
        },
        { 
          name: "Cherry", 
          availableOn: "2020-05-30T02:28:02.179+00:00",
          basePrice: 100,
         distance: 40, 
         numberOfRatings: 3,
         price: 90,
         quantity: 6,
         rating: 5,
          imageurl: "../../assets/vegetables/Cherry.jpg",
          firstName: "Seller Name" 
          },
          { 
            name: "Cherry", 
            availableOn: "2020-05-30T02:28:02.179+00:00",
            basePrice: 90,
           distance: 30, 
           numberOfRatings: 3,
           price: 90,
           quantity: 6,
           rating: 5,
            imageurl: "../../assets/vegetables/Cherry.jpg",
            firstName: "Seller Name" 
            },
            { 
              name: "Cherry", 
              availableOn: "2020-05-30T02:28:02.179+00:00",
              basePrice: 90,
             distance: 30, 
             numberOfRatings: 3,
             price: 90,
             quantity: 6,
             rating: 5,
              imageurl: "../../assets/vegetables/Cherry.jpg",
              firstName: "Seller Name" 
              },
              { 
                name: "Cherry", 
                availableOn: "2020-05-30T02:28:02.179+00:00",
                basePrice: 90,
               distance: 30, 
               numberOfRatings: 3,
               price: 90,
               quantity: 6,
               rating: 5,
                imageurl: "../../assets/vegetables/Cherry.jpg",
                firstName: "Seller Name" 
                },
     
  ];

    this.searchList = this.productList;
  }

  
  async addToCart(item: any) {
    this.animateCSS('tada');
  }

  async openCart() {
    this.nav.navigateBack("cartbasket");
     }

  animateCSS(animationName, keepAnimated = false) {
    const node = this.fab.nativeElement;
    node.classList.add('animated', animationName)

    function handleAnimationEnd() {
      if (!keepAnimated) {
        node.classList.remove('animated', animationName);
      }
      node.removeEventListener('animationend', handleAnimationEnd)
    }
    node.addEventListener('animationend', handleAnimationEnd)
  }

  openFirst() {
    this.menu.enable(true, 'second');
    this.menu.open('second');
  }
  goBack() {
    this.nav.navigateBack("product");
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

  openCartPage() {
    this.nav.navigateForward("cart");
  }

  }
