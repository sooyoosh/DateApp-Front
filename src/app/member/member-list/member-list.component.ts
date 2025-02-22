import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../services/member.service';
import { Member } from '../../models/Member';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent implements OnInit{
  members:Member[]=[]
  constructor(private memberService:MemberService,
    private messagingService:MessageService){}
  ngOnInit() {
    this.getAllMembers();
  }

  getAllMembers(){
    this.memberService.getMembers().subscribe({
      next:(res)=>{
        this.members=res
      },
      error:(err)=>{
        this.messagingService.add({
              key: 'toast1',
              severity: 'error', summary: 'Error in Fetching Members',
              detail:'' })
        
      }
    })
  }
}
