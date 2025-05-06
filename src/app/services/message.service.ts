import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { MessageParams, Messages } from '../models/messages';


@Injectable({
  providedIn: 'root'
})
export class MessageServicee {
ApibaseUrl:any=environment.apiBaseUrl;
constructor(private http:HttpClient) { }

GetMessagesForUser(messageParams:MessageParams){
  let params=new HttpParams();
  params=params.append("PageNumber",messageParams.pageNumber);
  params=params.append("PageSize",messageParams.pageSize)
  params=params.append('Container',messageParams.container)
  return this.http.get<Messages[]>(this.ApibaseUrl+'messages',{observe:'response',params})
}

 
GetMessageThread(userName){
  return this.http.get(this.ApibaseUrl+`messages/thread/${userName}`)
}


CreateMessage(model){
  return this.http.post(this.ApibaseUrl+`messages`,model)
}
DeleteMessage(id){
  return this.http.delete(this.ApibaseUrl+`messages/${id}`)
}

}
