import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  rand:number;
  show:boolean;
  check:boolean=true;
  constructor() {}
  
  ngOnInit(){
    this.rand = Math.floor(Math.random()*20)+1;
  }

  saveangka(a){
    if(a==this.rand){
      console.log("ANGKA SAMA");
      this.show=true;
      alert("CONGRATULATIONZZ");
    }
    else{
      console.log("ANGKA BEDA");
      this.show=false;
      alert("THE ANSWER IS "+this.rand)
    }
    this.rand = Math.floor(Math.random()*20)+1;
  }


}
