import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { MessageService } from 'primeng/api';
import { MenuItem } from 'primeng/api';
import { user } from '../models/user';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  isLogedIn:boolean=false
  items:MenuItem[]
  constructor(private accountService:AccountService,private messageService: MessageService ){

  }

  ngOnInit() {
    //menu items
    this.items=[
      {
        label:'welcome',
        icon:'pi pi-face-smile',
        items:[
          {
            label:'Edit Profile',
            icon:'pi pi-bolt',
            command:()=>this.editProfile()
            
          },
          {
            label:'Logout',
            icon:'pi pi-server',
            command:()=>this.logOut()
          }
        ]
      }
    ] 
    //menu items 
    //obsrve user login
    this.accountService.currentUser$.subscribe((data)=>{
      if(data!=null){
        this.isLogedIn=true
      }
    })
    //obsrve user login
  }

  onLogin(form:any){
    function hasValue(obj:Record<any,any>):boolean{
      return Object.values(obj).every(value=>value!=null&&value!=undefined&&value!="")
    }
    if(!hasValue(form.value)){
      this.messageService.add({ key: 'toast1', severity: 'error', summary: 'Error', detail:'it cant be Empty' });
      form.reset();
      return
    }
    this.accountService.login(form.value).subscribe({
      next:(data)=>{
        this.isLogedIn=true
      },
      error:(err)=>{
        this.messageService.add({ key: 'toast1', severity: 'error', summary: 'Error', detail:err.error });        
      }

    })

  }
  // getCurrentUser(){
  //   this.accountService.currentUser$.subscribe({
  //     next:(res)=>{
  //       this.isLogedIn=!!res
  //     },
  //     error:(err)=>{
  //       console.log(err)
  //     }
  //   })
  // }
  logOut(){
    this.isLogedIn=false
    this.accountService.logout();
  }

  editProfile(){

  }
}
