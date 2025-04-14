import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../services/member.service';
import { Member } from '../../models/Member';
import { MessageService } from 'primeng/api';
import { AccountService } from '../../services/account.service';
import { UserParams } from '../../models/userParams';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent implements OnInit{
  first: number = 0;
  genderList:genderLit[]
  orderByOption:orderBy[]
  
  constructor(public memberService:MemberService,
    private messagingService:MessageService,
    private accountService:AccountService){
      this.genderList=[{value:'male',display:'males'},
        {value:'female',display:'females'}];

      this.orderByOption=[{value:'created',display:'created'},
        {value:'lastActive',display:'lastActive'}];
    }
    userParams=new UserParams(this.accountService.curentUserValue())
  
  
    ngOnInit() {
    if(!this.memberService.PaginationResult()) this.getAllMembers();
  }

  getAllMembers(){
    debugger
     this.memberService.getMembers(this.userParams);
  }
  resetFilters(){ 
    this.userParams=new UserParams(this.accountService.curentUserValue());
    this.getAllMembers();
  }
  onPageChange(event){
      this.userParams.pageNumber=event.page;
      this.userParams.pageNumber++;
      this.getAllMembers();
  }
}
export interface genderLit {
  value:string,
  display:string
}
export interface orderBy {
  value:string,
  display:string
}