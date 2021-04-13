import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FotoService } from '../services/foto.service';

export interface fileFoto{
  name:string; //filepath
  path:string; //webfilepath
}

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  urlImageStorage : string[] = []; //url yg ada dimasukkan ke url image storage yg berupa array string

  constructor(
    private afStorage:AngularFireStorage,
    public fotoService :FotoService //unutk ambil data
  ) { }

  async ngOnInit() {
    // await this.fotoService.loadFoto();
  }

  async ionViewDidEnter(){
    await this.fotoService.loadFoto();
    this.tampilkanData();

  }
  hapusFoto(){
    var refImage = this.afStorage.storage.ref('imgStorage');
    refImage.listAll()
    .then((res)=>{
      res.items.forEach((itemRef)=>{
        itemRef.delete().then(()=>{
          //menampilkan data
          this.tampilkanData();

        });
      });

    }).catch((error)=>{
      console.log(error);
    });
  }

  tampilkanData(){
    this.urlImageStorage=[];//ini nampung semua urlnya hrs dikosongkan dulu di awal
    var refImage = this.afStorage.storage.ref('imgStorage'); //lalu dibaca lagi isi urlnya dari awal
    refImage.listAll()
    .then((res)=>{
      res.items.forEach((itemRef)=>{
        itemRef.getDownloadURL().then(url=>{
          this.urlImageStorage.unshift(url);
        })

      });


    }).catch((error)=>{
      console.log(error);
    });


  }
  uploadFoto(){
    this.urlImageStorage=[];
    for(var index in this.fotoService.dataFoto){
      const imgFilepath =`imgStorage/${this.fotoService.dataFoto[index].filePath}` //ini nnti dibuat sebagai sperti foldernya, kalo filepath itu nama filenya
      
      this.afStorage.upload(imgFilepath,this.fotoService.dataFoto[index].dataImage).then(() => { //ini buat masukin ke firebasenya dan ngambil url dri gambar yg sdh diupload
        this.afStorage.storage.ref().child(imgFilepath).getDownloadURL().then((url)=> { //akan ambil data membaca datanya, childnya itu sesuai dengan imgfilepath yg udh dimasukin, get download url buat nampilin imagenya, hsilnya dimasukin var url
          this.urlImageStorage.unshift(url);
          console.log(url);
        });
      });

    }

  }

}
