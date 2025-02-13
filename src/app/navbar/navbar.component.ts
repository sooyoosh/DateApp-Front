import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { MessageService } from 'primeng/api';
import { MenuItem } from 'primeng/api';
import { user } from '../models/user';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
  isLogedIn:boolean=false
  items:MenuItem[]
  userName:any
  constructor(private accountService:AccountService,private messageService: MessageService,
    private router:Router
   ){

  }

  ngOnInit() {

     
    //obsrve user login
    this.accountService.currentUser$.subscribe((data)=>{
      if(data!=null){
        this.isLogedIn=true
        this.userName=data.username
        //menu items
    this.items=[
      {
        label:this.userName?`Welcome ${this.userName}`:'Welcome',
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
        this.router.navigate(['/members'])
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
    this.router.navigate(['/'])
  }

  editProfile(){

  }
}
