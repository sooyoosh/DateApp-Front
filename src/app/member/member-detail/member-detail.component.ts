import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../services/member.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../../models/Member';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.css'
})
export class MemberDetailComponent implements OnInit{
  member:Member
  images: any[]=[];
  responsiveOptions: any[]=[];
  constructor(private memberService:MemberService,
    private messagingService:MessageService,private route:ActivatedRoute
  ){
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 5
      },
      {
          breakpoint: '768px',
          numVisible: 3
      },
      {
          breakpoint: '560px',
          numVisible: 1
      }
  ];
  }
  ngOnInit() {
    this.loadMember()
  }
  loadMember(){
    debugger
    const userName=this.route.snapshot.paramMap.get('userName')
    if(!userName) return
    this.memberService.getMemberByUsername(userName).subscribe({
      next:(res)=>{
        this.member=res,
        // res.photos.map(p=>{
        //   this.images.push({src:p.url,thum:p.url})
        // })
        this.images.push({src:'../../../assets/profile-user.jpg',thum:'../../../assets/profile-user.jpg'})
      },
      error:(err)=>{
        this.messagingService.add({
          key: 'toast1',
          severity: 'error', summary: 'Error in Fetching Member',
          detail:'' })
      }
    })
  }

}
