import { Inject, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { MessageService } from 'primeng/api';

export const authGuard: CanActivateFn = (route, state) => {
  let accountService= inject(AccountService)
  let messagingService=inject(MessageService)
  let router=inject(Router)
  let isLogedIn:boolean=false
  accountService.currentUser$.subscribe((data)=>{
    if(data!=null){
      isLogedIn=true
    }
  })
  if(isLogedIn){
    return true
  }else{
    messagingService.add({ key: 'toast1', severity: 'error', summary: 'Error', detail:'You shall not pass' });
    router.navigate(['/'])
    return false
  }
};
