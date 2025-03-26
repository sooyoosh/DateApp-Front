import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Member } from '../../models/Member';
import { MemberService } from '../../services/member.service';
import { Photo } from '../../models/photo';
import { AccountService } from '../../services/account.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrl: './photo-editor.component.css'
})
export class PhotoEditorComponent implements OnInit{
  @Input() member:Member
  @Output() emitMember=new EventEmitter<Member>();
  updateMember:Member
  uploadedFiles: any[] = [];
  constructor(private memberService:MemberService,private accountService: AccountService,private messagingService:MessageService){

  }
  ngOnInit() {
    
  }

  customUpload(event){
    for(let file of event.files) {
      if(file){
        const reader=new FileReader();
        
        reader.onload=(e:any)=>{
          this.updateMember={...this.member}
          this.updateMember.photos.push({id:0,url:e.target.result,isMain:false})
          this.emitMember.emit(this.updateMember)
        }

        reader.readAsDataURL(file)
      }
      
    }

  }

  setMain(photo:Photo){
    this.memberService.setMainPhoto(photo.id).subscribe((data)=>{
      const user=this.accountService.curentUserValue()
        if(user){
          user.photoUrl=photo.url
          this.accountService.correntUserSource.next(user)
        }

      const updateMember={...this.member}
      updateMember.photoUrl=photo.url
      updateMember.photos.forEach(x=>{
        if(x.isMain) x.isMain=false
        if(x.id==photo.id) x.isMain=true
      });
      this.emitMember.emit(updateMember)
    },
  (err)=>{
    this.messagingService.add({
      key: 'toast1',
      severity: 'error', summary: 'Fail',
      detail:'' })
  })
  }
  deletePhoto(photoId){
    this.memberService.deletePhoto(photoId).subscribe({
      next:(res)=>{
        this.messagingService.add({
          key: 'toast1',
          severity: 'success', summary: 'Phtoo Is Deleted',
          detail:'' });
          const updateMember={...this.member}
          updateMember.photos.filter(i=>i.id!=photoId)
          this.emitMember.emit(updateMember)
      },
      error:(err)=>{
        this.messagingService.add({
          key: 'toast1',
          severity: 'error', summary: 'Fail',
          detail:'' })
      }
    })
  }
}
