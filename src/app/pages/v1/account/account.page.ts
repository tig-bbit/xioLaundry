import { Component, OnInit } from '@angular/core';
import { ToastController, LoadingController, ActionSheetController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AccessClaundry } from '../../../providers/access-claundry';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  stlaundry : string = "Buka";
  stbglaundry : string = "gridheader-open";
  stbgslaundry : string = "headbg-open";
  constructor(
    public actionSheetController: ActionSheetController,
    private router: Router,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private actRoute: ActivatedRoute,
    private accsClaundry: AccessClaundry,
    private storage: Storage,      
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Status Laundry',
      buttons: [{
        text: 'Laundry Penuh (Sibuk)',
        icon: 'backspace',
        handler: () => {
          this.stlaundry = "Sibuk";
          this.stbglaundry = "gridheader-sibuk"; // s
          this.stbgslaundry = "headbg-sibuk";
        }
      }, {
        text: 'Laundry Buka',
        icon: 'open',
        handler: () => {
          this.stlaundry = "Buka";
          this.stbglaundry = "gridheader-open"; // b
          this.stbgslaundry = "headbg-open";
        }
      }, {
        text: 'Laundry Tutup',
        icon: 'close',
        handler: () => {
          this.stlaundry = "Tutup";
          this.stbglaundry = "gridheader-tutup"; // t
          this.stbgslaundry = "headbg-tutup";
        }
      }]
    });
    await actionSheet.present();
  }

  goProfil(){
  	console.log('OK');
  }

  goTagihan(){
  	console.log('OK');
  }

  async prosesLogout(){
    this.storage.clear();
    this.router.navigate(['/signin']);
    const toast = await this.toastCtrl.create({
        message: 'Akun anda telah keluar',
        duration: 1500
      });
    toast.present();
  }

}
