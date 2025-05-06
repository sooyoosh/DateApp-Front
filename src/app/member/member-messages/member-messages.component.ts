import { Component, Input, OnInit } from '@angular/core';
import { MessageServicee } from '../../services/message.service';
import { Messages } from '../../models/messages';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrl: './member-messages.component.css'
})
export class MemberMessagesComponent implements OnInit {

  @Input() userName:string
  messages:Messages[]=[]
  contentMessage:any
  constructor(private messageService:MessageServicee,private messagingService:MessageService){}
  
  ngOnInit() {
    this.loadMessages();
  }

  loadMessages(){
    this.messageService.GetMessageThread(this.userName).subscribe({
      next:(data)=>{
        this.messages=data as Messages[]
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }


  sendMessage(){
    let model={
      recipientUserName:this.userName,
      content:this.contentMessage
    }
      this.messageService.CreateMessage(model).subscribe({
        next:(res)=>{
          this.messagingService.add({
            key: 'toast1',
            severity: 'success', summary: 'message sent!',
            detail:'' })
          this.loadMessages();
          this.contentMessage=null;
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
