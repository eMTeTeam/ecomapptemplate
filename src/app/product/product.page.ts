import { Component } from '@angular/core';
import { MenuController, ActionSheetController, LoadingController, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-product',
    templateUrl: 'product.page.html',
    styleUrls: ['product.page.scss'],
})
export class ProductPage {
    productList: any;
    categoryList: any;
    searchQuery: string;
    searchList: any;
    selectedCategory: any;
    //router: any;
    //foo: any;
    constructor(private menu: MenuController,
        private route: ActivatedRoute,
        private router: Router,
        public loadingController: LoadingController,
        public actionSheetController: ActionSheetController,
        public nav: NavController, ) {
        this.presentLoading();
        this.productList = [
            {
                productName: "Banana",
                isFavourite: true,
                readyOn: "Now",
                distanceRange: "17-34",
                priceRange: "70 - 100",
                imageurl: "../../assets/vegetables/Banana.jpg"
            },
            {
                productName: "Tomato",
                isFavourite: false,
                readyOn: "Now",
                distanceRange: "17-34",
                priceRange: "70 - 100",
                imageurl: "../../assets/vegetables/Tomato.jpg"
            },
            {
                productName: "Beetroot",
                isFavourite: true,
                readyOn: "Now",
                distanceRange: "17-34",
                priceRange: "70 - 100",
                imageurl: "../../assets/vegetables/Beetroot.jpg"
            },
            {
                productName: "Cherry",
                isFavourite: true,
                readyOn: "Now",
                distanceRange: "17-34",
                priceRange: "70 - 100",
                imageurl: "../../assets/vegetables/Cherry.jpg"
            },
            {
                productName: "Cabbage",
                isFavourite: false,
                readyOn: "Now",
                distanceRange: "17-34",
                priceRange: "70 - 100",
                imageurl: "../../assets/vegetables/Cabbage.jpg"
            },
            {
                productName: "Orange",
                isFavourite: true,
                readyOn: "Now",
                distanceRange: "17-34",
                priceRange: "70 - 100",
                imageurl: "../../assets/vegetables/Orange.jpg"
            },
         
        ];

        this.searchList = this.productList;
    }

    openFirst() {
        this.menu.enable(true, 'second');
        this.menu.open('second');
    }
    goBacktoHome() {
        this.nav.navigateBack("home");
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
    goToProductDetail() {
        this.nav.navigateForward("sellerproductlist");

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
