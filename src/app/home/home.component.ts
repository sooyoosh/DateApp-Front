import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AccountService } from '../services/account.service';
import { user } from '../models/user';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  registerMode:boolean=false
  isLogedIn:boolean=false
  registerForm:FormGroup
  maxDate=new Date();
  constructor(private messageService: MessageService,private accountService:
    AccountService,private fb:FormBuilder,private router:Router
  ){}

  ngOnInit() {
    this.accountService.currentUser$.subscribe((data)=>{
      data!=null?this.isLogedIn=true:this.isLogedIn=false
    })
    this.initialForms();
    this.maxDate.setFullYear(this.maxDate.getFullYear()-19)
  }

initialForms(){
this.registerForm=this.fb.group({
  gender:[''],
  username:['',[Validators.required]],
  knownAs:['',Validators.required],
  dateOfBirth:['',Validators.required],
  city:['',Validators.required],
  country:['',Validators.required],
  password:['',[Validators.required,Validators.minLength(4)]],
  confirmPassword:['',[Validators.required,this.matchValue('password')]]
})
}

matchValue(matchToControlName:string):ValidatorFn{
  return(control:AbstractControl)=>{
    return control.value === control.parent?.get(matchToControlName)?.value?null:
    {missMatching:true}
  }
}



registerToggle(){
  this.registerMode=true
}
register(){
  function hasValue(obj:Record<any,any>):boolean{
    return Object.values(obj).every(value=>value!=null&&value!=undefined&&value!="")
  }
  if(!hasValue(this.registerForm.value)){
    this.messageService.add({ key: 'toast1', severity: 'error', summary: 'Error', detail:'it cant be Empty' });
    this.registerForm.reset();
    return
  }
  // 
  const date=this.registerForm.controls['dateOfBirth'].value.toISOString().split('T')[0];
  this.registerForm.patchValue({
    dateOfBirth:date
  })
  // 
  this.accountService.register(this.registerForm.value).subscribe({
    next:(res:any)=>{
    this.router.navigate(['/members'])    
    },
    error:(err)=>{
      this.messageService.add({ key: 'toast1', severity: 'error', summary: 'Error', detail:'' })
    }
  })
}
cancle(){
  this.registerMode=false
  this.registerForm.reset();
}

}
