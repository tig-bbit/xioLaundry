import { Component, OnInit } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AccessClaundry } from '../../../providers/access-claundry';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-activation',
  templateUrl: './activation.page.html',
  styleUrls: ['./activation.page.scss'],
})
export class ActivationPage implements OnInit {

  tipe_aktivasi: string;
  kode_aktivasi: string;
  opsi_aktivasi: string;

  kode_verifikasi: string;
  constructor(
  	private router: Router,
  	public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private actRoute: ActivatedRoute,
    private accsClaundry: AccessClaundry,
    private storage: Storage,
  ) { }

  ngOnInit() {
    this.actRoute.params.subscribe((data: any) =>{
      this.tipe_aktivasi = data.tipe_aktivasi;
      this.kode_aktivasi = data.kode_aktivasi;
      this.opsi_aktivasi = data.opsi_aktivasi;
      console.log(data);
    });
  }

  async verifikasiKode(){
    if(this.kode_verifikasi!=this.kode_aktivasi){
      const toast = await this.toastCtrl.create({
        message: 'Kode aktivasi tidak sesuai',
        duration: 1500
      });
      toast.present();
    }else{
      const loader = await this.loadingCtrl.create({
        message: 'Please wait...',
      });
      loader.present().then(() => {
        return new Promise(resolve => {
          let body = {
            aksi : 'verifikasi_kode',
            kode_verifikasi : this.kode_verifikasi,
            opsi_aktivasi : this.opsi_aktivasi,
            tipe_aktivasi : this.tipe_aktivasi

          };

          this.accsClaundry.postData(body, 'claundry-serverlaundry.php').subscribe(data => {
            if(this.tipe_aktivasi=='1'){
              this.router.navigate(['/templaundry/' + data.opsi_aktivasi]);
            }else{
              this.storage.set('session_storage', data.result);
              this.router.navigate(['']);
            }
          });
        });
      });
      loader.dismiss(); 
    }
  }

}
