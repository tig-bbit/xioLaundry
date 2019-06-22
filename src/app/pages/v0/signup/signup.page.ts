import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { AccessClaundry } from '../../../providers/access-claundry';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  opsi_hp: string = "";
  opsi_email: string = "";

  displayhp: string = "";
  displayemail: string = "displaynone";
  activehp: string = "active";
  activeemail: string = "";

  disableButton;

	constructor(
		private router: Router,
    private accsClaundry: AccessClaundry,
  	public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
	) { }

	ngOnInit() {
	}

  ionViewDidEnter(){
    this.disableButton = false;
  }

	optionStart(){
	  this.router.navigate(['/cl-login']);
	}

  opsiHp(){
    this.displayhp = "";
    this.displayemail = "displaynone";
    this.activehp = "active";
    this.activeemail = "";
  }

  opsiEmail(){
    this.displayhp = "displaynone";
    this.displayemail = "";
    this.activeemail = "active";
    this.activehp = "";
  }

  async aktivasiOpsi(){
    var ceknohp = this.opsi_hp.substring(0,1);
    if(this.activehp=='active'){
      if(this.opsi_hp==""){
        const toast = await this.toastCtrl.create({
          message: 'No. handphone tidak boleh kosong',
          duration: 1500
        });
        toast.present();
      }else if(ceknohp!="0"){
        const toast = await this.toastCtrl.create({
          message: 'No. handphone harus di awali dengan angka 0',
          duration: 1500
        });
        toast.present();
      }else{

        this.disableButton = true;

        const loader = await this.loadingCtrl.create({
          message: 'Please wait...',
        });
        loader.present().then(() => {
          return new Promise(resolve => {
            let body = {
              aksi : 'aktivasi_akses',
              opsi_aktivasi : this.opsi_hp,
              tipe_aktivasi : '2' // 2 = daftar, 1 = login
            };

            this.accsClaundry.postData(body, 'claundry-serverlaundry.php').subscribe(data => {
              this.router.navigate(['/activation/' + data.tipe_aktivasi + '/' + data.kode_aktivasi + '/' + data.opsi_aktivasi]);
            });
          }); 
        });
        loader.dismiss();
      }
    }else{
      if(this.opsi_email==""){
        const toast = await this.toastCtrl.create({
          message: 'Email tidak boleh kosong',
          duration: 1500
        });
        toast.present();
      }else{

        this.disableButton = true;

        const loader = await this.loadingCtrl.create({
          message: 'Please wait...',
        });
        loader.present().then(() => {
          return new Promise(resolve => {
            let body = {
              aksi : 'aktivasi_akses',
              opsi_aktivasi : this.opsi_email,
              tipe_aktivasi : '2' // 2 = daftar, 1 = login
            };

            this.accsClaundry.postData(body, 'claundry-serverlaundry.php').subscribe(data => {
              this.router.navigate(['/activation/' + data.tipe_aktivasi + '/' + data.kode_aktivasi + '/' + data.opsi_aktivasi]);
            });
          }); 
        });
        loader.dismiss();
      }
    }
  }

}
