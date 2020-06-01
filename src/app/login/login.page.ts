import { Component, OnInit } from '@angular/core';
import { ToastController, NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage implements OnInit {

  public response: any;
  public error: any;
  returnUrl: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastController: ToastController,
    private navCtrl: NavController) { }

  ngOnInit() {
     }
 
  async showErrorToast(error: any) {
    const toast = await this.toastController.create({
      message: 'Error: ' + error,
      duration: 2000,
      position: 'top',
    });

    toast.present();
  }
}