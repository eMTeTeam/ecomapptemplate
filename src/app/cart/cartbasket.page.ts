import { Component, OnInit } from '@angular/core';
import { MenuController, ActionSheetController, LoadingController, NavController, ModalController, AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-cartbasket',
  templateUrl: './cartbasket.page.html',
  styleUrls: ['./cartbasket.page.scss'],
})
export class CartbasketPage {

  cart: any;
  productList: any;
  categoryList: any;
  searchQuery: string;
  searchList: any;
  masterSelected: boolean;
  checkedList: any;
  checklist: any;
  savedData: any = "";
  prId: any;
  total: number = 0;
  priceTotal: number = 0;
  price: number = 0;
  quantity: any;
  addressList:any;
  private currentNumber = 1;

  private increment() {
    this.currentNumber++;
  }

  private decrement() {
    this.currentNumber--;
    if (this.currentNumber < 1) {
      this.currentNumber = 1
    }
  }

  constructor(private menu: MenuController,
    public loadingController: LoadingController,
    public actionSheetController: ActionSheetController,
    public nav: NavController,
    public httpClient: HttpClient,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private route: ActivatedRoute) {
    // this.cart = this.cartService.getBasketItems();
    this.cart = [
      { id: "08d7f3eb-bf2c-4d7b-82ca-9a0ef5ab1015",
       productId: "0e69b5c1-efad-4e54-ae31-3a501ffdc97d", 
       quantity: 2, 
       productName: "Cherry",
        price: 176,
        isSelected: true,
        firstName: "seller2",
         imageurl: "../../assets/vegetables/Cherry.jpg" 
        },
        { id: "08d7f3eb-bf2c-4d7b-82ca-9a0ef5ab1015",
        productId: "0e69b5c1-efad-4e54-ae31-3a501ffdc97d", 
        quantity: 2, 
        productName: "Cherry",
         price: 176,
         isSelected: true,
         firstName: "seller2",
          imageurl: "../../assets/vegetables/Cherry.jpg" 
         },
         { id: "08d7f3eb-bf2c-4d7b-82ca-9a0ef5ab1015",
         productId: "0e69b5c1-efad-4e54-ae31-3a501ffdc97d", 
         quantity: 2, 
         productName: "Cherry",
          price: 176,
          isSelected: true,
          firstName: "seller2",
           imageurl: "../../assets/vegetables/Cherry.jpg" 
          },
          { id: "08d7f3eb-bf2c-4d7b-82ca-9a0ef5ab1015",
          productId: "0e69b5c1-efad-4e54-ae31-3a501ffdc97d", 
          quantity: 2, 
          productName: "Cherry",
           price: 176,
           isSelected: true,
           firstName: "seller2",
            imageurl: "../../assets/vegetables/Cherry.jpg" 
           }
    ];
    this.addressList=[
      { addressId: "08d80441-dd67-4b3e-8b8e-55063a7e0f47",
      addressLine1: "Guindy",
      addressLine2: "KK NAgar",
      addressType: "Home",
      city: "Chennai",
      country: "India",
      isDefault: true,
      lattitude: 12.741393224461078,
      longitude: 80.13741636648777,
      state: "Tamil Nadu",
      zip: 600456
       }
    ];
    this.checklist = this.cart;
    this.masterSelected = true;
  }
  getTotal(total: number) {
    return 200;
  }

  checkUncheckAll() {
    for (var i = 0; i < this.cart.length; i++) {
      this.cart[i].isSelected = this.masterSelected;
    }
    this.total = 0;
    this.getCheckedItemList();
  }

  isAllSelected() {
    // this.masterSelected=this.cart.every
    this.masterSelected = this.cart.every(function (item: any) {
      return item.isSelected == true;
    })
    this.getCheckedItemList();
  }

  getCheckedItemList() {
    this.checkedList = [];
    // this.checklist = this.cart.map(elm => ({ ProductId: elm.id, Price: elm.price, ProductName: elm.name, Image: elm.imageUrl, Rating: elm.rating, NumberOfRatings: elm.numberOfRatings, Userid: elm.userId, isSelected: elm.isSelected }))
    for (var i = 0; i < this.cart.length; i++) {
      if (this.cart[i].isSelected)
        this.total = this.total + this.cart[i].price;

      this.checkedList.push(this.cart[i]);
    }

    console.log(this.total);
    //  this.checkedList = JSON.stringify(this.checkedList);
    //this.prId = this.checkedList[0].id;
    console.log(this.checkedList);
    console.log(this.checkedList[0].productId);
  }



  goback() {
    this.nav.navigateBack("sellerproductlist");
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
          console.log('Share clicked');
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

  openListPage() {
    this.nav.navigateForward("home");
  }

  openCartPage() {
    this.nav.navigateForward("cart");
  }

  openAccountPage() {
    this.nav.navigateForward("account");
  }

  async checkout() {
    let alert = await this.alertCtrl.create({
      header: 'Thanks for your Order!',
      message: 'We will deliver your products as soon as possible. Total amount is ₹ 326',
      buttons: ['OK']

    });
    alert.present().then(() => {
      this.modalCtrl.dismiss();
    });
  }

}