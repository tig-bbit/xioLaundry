import { Component, OnInit } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AccessClaundry } from '../../../providers/access-claundry';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-templaundry',
  templateUrl: './templaundry.page.html',
  styleUrls: ['./templaundry.page.scss'],
})
export class TemplaundryPage implements OnInit {

  opsi_aktivasi: string;

  // untuk button next and prev
	actionslide: string = "satu";

	nama_lengkap: string ="";
	jenis_kelamin: string ="";
	no_ktp: string ="";

	nama_usaha: string ="";
	alamat_usaha: string ="";

	displaynone: string = "";
	displaynone2: string = "displaynone";
	displaynone3: string = "displaynone";
 	
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
      this.opsi_aktivasi = data.opsi_aktivasi;
      console.log(data);
    });
	}

  async nextSatu(){
    if(this.nama_lengkap==""){
    	const toast = await this.toastCtrl.create({
		    message: 'Nama pemilik tidak boleh kosong',
		    duration: 2000
		});
		toast.present();
    }else if(this.jenis_kelamin==""){
    	const toast = await this.toastCtrl.create({
		    message: 'Jenis kelamin tidak boleh kosong',
		    duration: 2000
		});
		toast.present();
    }else if(this.no_ktp==""){
    	const toast = await this.toastCtrl.create({
		    message: 'Nomor handphone tidak boleh kosong',
		    duration: 2000
		});
		toast.present();
    }else{
      this.actionslide = 'dua';
      this.displaynone = 'displaynone';
      this.displaynone2 = '';
      this.displaynone3 = 'displaynone';
    } 
  }

  backSatu(){
  	this.actionslide = 'satu';
    this.displaynone = '';
    this.displaynone2 = 'displaynone';
    this.displaynone3 = 'displaynone';
  }

  async prosesStore(){
    if(this.nama_usaha==""){
    	const toast = await this.toastCtrl.create({
		    message: 'Nama usaha laundry tidak boleh kosong',
		    duration: 2000
		});
		toast.present();
    }else if(this.alamat_usaha==""){
    	const toast = await this.toastCtrl.create({
		    message: 'Alamat laundry tidak boleh kosong',
		    duration: 2000
		});
		toast.present();
    }else{
      const loader = await this.loadingCtrl.create({
        message: 'Please wait...',
      });
      loader.present().then(() => {
        return new Promise(resolve => {
          let body = {
            aksi : 'simpan_data_pendaftaran',
            opsi_aktivasi : this.opsi_aktivasi,
            nama_lengkap : this.nama_lengkap,
            jenis_kelamin : this.jenis_kelamin,
            no_ktp : this.no_ktp,
            nama_usaha : this.nama_usaha,
            alamat_usaha : this.alamat_usaha,
          };

          this.accsClaundry.postData(body, 'claundry-serverlaundry.php').subscribe(data => {
            this.storage.set('session_storage', data.result);
            this.actionslide = 'tiga';
            this.displaynone = 'displaynone';
            this.displaynone2 = 'displaynone';
            this.displaynone3 = '';
          });
        }); 
      });
      loader.dismiss();
    } 
  }

  optionStart(){
    this.router.navigate(['']);
  }

}
