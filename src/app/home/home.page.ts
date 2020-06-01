import { Component } from '@angular/core';
import { MenuController, ActionSheetController, LoadingController, NavController } from '@ionic/angular';
import { IonSlides } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    categoryList: any;
    searchQuery: string;
    searchList: any;
    constructor(private menu: MenuController,
        public loadingController: LoadingController,
        public actionSheetController: ActionSheetController,
        public nav: NavController) {
        this.presentLoading();
        this.categoryList =
            [
                { name: "Vegetables", price: 300, imageurl: "../../assets/Vegetables.jpg" },
                { name: "Fruits", price: 500, imageurl: "../../assets/Fruits.jpg" },
                { name: "Flowers", price: 600, imageurl: "../../assets/Flowers.jpg" },
                { name: "Cosmetics", price: 300, imageurl: "../../assets/Cosmetics.jpg" },
                { name: "Cloths", price: 100, imageurl: "../../assets/Cloths.jpg" },
                { name: "Kitchen Sets", price: 100, imageurl: "../../assets/Kitchen.jpg" },
                { name: "Foods", price: 100, imageurl: "../../assets/Foods.jpg" },
                { name: "Meats", price: 100, imageurl: "../../assets/Meats.jpg" },
            ];
        this.searchList = this.categoryList;
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
    openProduct(item) {
        this.nav.navigateForward("product");
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
        this.searchList = this.searchValue(this.categoryList, text);
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
