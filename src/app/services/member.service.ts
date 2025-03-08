import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Member } from '../models/Member';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  baseUrl:any=environment.apiBaseUrl
  members=signal<Member[]>([]);//this is for store state

  constructor(private http:HttpClient) { }

  getMembers(){
    return this.http.get<Member[]>(this.baseUrl+'users').subscribe({
      next:(data)=>{
        this.members.set(data);
      }
    })
  }
  getMemberByUsername(userName){
    const member=this.members().find(x=>x.userName==userName);
    if(member!==undefined && member!==null) return of(member);
    return this.http.get<Member>(this.baseUrl+'users/'+userName)
  }
  updateMember(member:Member){
    return this.http.put(this.baseUrl+'users',member)
  }
}
