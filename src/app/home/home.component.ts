import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AccountService } from '../services/account.service';
import { user } from '../models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  registerMode:boolean=false
  constructor(private messageService: MessageService,private accountService:
    AccountService
  ){}

  ngOnInit() {
    
  }

registerToggle(){
  this.registerMode=true
}
register(form){
  function hasValue(obj:Record<any,any>):boolean{
    return Object.values(obj).every(value=>value!=null&&value!=undefined&&value!="")
  }
  if(!hasValue(form.value)){
    this.messageService.add({ key: 'toast1', severity: 'error', summary: 'Error', detail:'it cant be Empty' });
    form.reset();
    return
  }
  this.accountService.register(form.value).subscribe({
    next:(res:any)=>{
      debugger
    },
    error:(err)=>{
      debugger
    }
  })

}
cancle(){
  this.registerMode=false
}

}
