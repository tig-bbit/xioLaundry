import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AccessClaundry } from '../../../providers/access-claundry';
import { ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  opsi_hp: string = "";
  opsi_email: string = "";

  displayhp: string = "";
  displayemail: string = "displaynone";
  activehp: string = "active";
  activeemail: string = "";

  disableButton;

  constructor(
    private router: Router,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private actRoute: ActivatedRoute,
    private accsClaundry: AccessClaundry
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.disableButton = false;
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
              tipe_aktivasi : '1' // 2 = daftar, 1 = login
            };

            this.accsClaundry.postData(body, 'claundry-serverlaundry.php').subscribe(data => {
              this.router.navigate(['/activation/2/' + '/' + data.kode_aktivasi + '/' + data.opsi_aktivasi]);
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
              tipe_aktivasi : '1' // 2 = daftar, 1 = login
            };

            this.accsClaundry.postData(body, 'claundry-serverlaundry.php').subscribe(data => {
              this.router.navigate(['/activation/2/' + '/' + data.kode_aktivasi + '/' + data.opsi_aktivasi]);
            });
          }); 
        });
        loader.dismiss();
      }
    }
  }

  optionDaftar(){
  	this.router.navigate(['signup']); ///cl-daftar
  }

}
