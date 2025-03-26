import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { MemberService } from '../../services/member.service';
import { Member } from '../../models/Member';
import { MessageService } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { user } from '../../models/user';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.css'
})
export class MemberEditComponent implements OnInit {
member:Member
user:user
@ViewChild('editForm') editForm:NgForm;
@HostListener('window:beforeunload',['$event']) func(event:any){
  if(this.editForm.dirty){
    event.returnValue=true
  }
}
constructor(private accountService:AccountService,
   private memberService:MemberService,private messagingService:MessageService){

}

  ngOnInit() {
    this.loadMember()
  }

loadMember(){
  const user=this.accountService.currentUser$.subscribe({
    next:(user)=>{
      if(user!=null){
        this.user=user
        this.memberService.getMemberByUsername(user.username).subscribe({
          next:(member)=> {debugger
            this.member=member},
          error:(err)=>{
            this.messagingService.add({
              key: 'toast1',
              severity: 'error', summary: 'Error in Fetching Members',
              detail:'' })
          } 
        })
      }
    }
  })
}
updateMember(){
  this.memberService.updateMember(this.member).subscribe({
    next:(res)=>{
      this.editForm.reset(this.member);
      this.messagingService.add({key: 'toast1',
        severity: 'success', summary: 'member is updated',
        detail:''})
    },
    error:(err)=>{
      this.messagingService.add({key: 'toast1',
        severity: 'error', summary: 'fail to update',
        detail:''})
    }
  })
}

emitMember(member:Member){
  this.member=member,
  this.memberService.members.set([])
}
// fetchingMember(){
//   this.memberService.getMemberByUsernameApi(this.user.username).subscribe({
//     next:(res)=>{
//       this.member=res
//       this.member={...this.member}
//     },
//     error:(err)=>{
//       console.log("error in fetching member")
//     }
//   })
// }

}
