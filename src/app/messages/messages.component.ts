import { Component, OnInit } from '@angular/core';
import { MessageParams, Messages } from '../models/messages';
import { MessageService } from 'primeng/api';
import { MessageServicee } from '../services/message.service';
import { PaginationResult } from '../models/pagination';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent implements OnInit {
  paginationResult=new PaginationResult<Messages[]>()
  messageParams=new MessageParams();
  first: number = 0;
  constructor( private messagingService:MessageService,
    private messageService:MessageServicee
   ){}

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages(container?:string){
    if(container)this.messageParams.container=container;
    this.paginationResult.items=[]
    this.messageService.GetMessagesForUser(this.messageParams).subscribe({
      next:(res)=>{
        this.paginationResult.items=res.body as Messages[]
        this.paginationResult.pagination=JSON.parse(res.headers.get('Pagination')!)
      },
      error:(err)=>{

      }
    })
  }

  getRoutes(message:Messages){
   return this.messageParams.container=='Outbox'?  `${message.recipientUsername}`
    :  `${message.senderUsername}`
  }

  onPageChange(event){
    this.messageParams.pageNumber=event.page;
    this.messageParams.pageNumber++;
    this.loadMessages();
  }
  deleteMessage(id){
    this.messageService.DeleteMessage(id).subscribe({
      next:(res)=>{
        this.paginationResult.items=this.paginationResult.items.filter(x=>x.id!==id);
        this.messagingService.add({
          key: 'toast1',
          severity: 'success', summary: 'message deleted!',
          detail:'' })
      },
      error:(err)=>{
        debugger
        this.messagingService.add({
          key: 'toast1',
          severity: 'error', summary: 'Fail',
          detail:'' })
      }
    })
  }  

}
