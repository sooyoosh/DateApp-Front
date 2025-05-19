import { Component, computed, OnInit } from '@angular/core';
import { MemberService } from '../../services/member.service';
import { Member } from '../../models/Member';
import { MessageService } from 'primeng/api';
import { AccountService } from '../../services/account.service';
import { UserParams } from '../../models/userParams';
import { LikesService } from '../../services/likes.service';
import { PresenceService } from '../../services/presence.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent implements OnInit{
  first: number = 0;
  genderList:genderLit[]
  orderByOption:orderBy[]
  //members:Member[]|null|undefined
  constructor(public memberService:MemberService,
    private messagingService:MessageService,
    private accountService:AccountService,
    private likeService:LikesService,private presenceService:PresenceService){

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
     this.memberService.getMembers(this.userParams);
    //  this.members=this.memberService.members();
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
  hasLiked(id: number): boolean {
    return this.likeService.likedIds().includes(id);
  }
  isOnline(username: string): boolean {
    return this.presenceService.onlineUsers().includes(username);
  }
  toggleLike(id){
    this.likeService.toggleLike(id).subscribe({
      next:(res)=>{
        if(this.hasLiked(id)){
          this.likeService.likedIds.update(ids=>ids.filter(x=>x!==id))
        }else{
          this.likeService.likedIds.update(ids=>[...ids,id])
        }
      }
    })
    
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