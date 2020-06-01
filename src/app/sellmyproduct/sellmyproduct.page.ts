import { Component } from '@angular/core';
import { MenuController, ActionSheetController, LoadingController, NavController, ModalController, AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    selector: 'app-sellmyproduct',
    templateUrl: 'sellmyproduct.page.html',
    styleUrls: ['sellmyproduct.page.scss'],
})
export class SellmyproductPage {
    productList: any;
    categoryList: any;
    currentDate: any;
    searchList: any;
    products: any;
    selectedCategory: any;
    selectedProduct: any;
    today: any;
    savedData: any = "";
    price: string;
    quantity: any;
    unitName: string;

    constructor(private menu: MenuController,
        public loadingController: LoadingController,

        public httpClient: HttpClient,

        public actionSheetController: ActionSheetController,
        private modalCtrl: ModalController,
        private alertCtrl: AlertController,
        private router: Router,
        public nav: NavController) {
        this.presentLoading();
        var curreDate = new Date();
        var curdate = curreDate.toLocaleDateString();
        this.currentDate = curdate;
       
        this.searchList = this.productList;
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

    changeProductAvailableDate(date) {
        console.log(date);
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

    goback() {
        this.nav.navigateForward("allproductslist");
    }
   async addProduct()
    {
        const alert = await this.alertCtrl.create({
            header: 'Confirm!',
            message: 'Product Added Successfully',
            mode: 'ios',
            buttons: [
                {
                    text: 'Okay',

                    handler: () => {
                        this.router.navigate(['/allproductslist']);
                    }
                }
            ]
        });
        await alert.present().then(() => {

            //this.loading.onDidDismiss();
        });
    }
}
