import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Member } from '../models/Member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  baseUrl:any=environment.apiBaseUrl

  constructor(private http:HttpClient) { }

  getMembers(){
    return this.http.get<Member[]>(this.baseUrl+'users')
  }
  getMemberByUsername(userName){
    return this.http.get<Member>(this.baseUrl+'users/'+userName)
  }
  updateMember(member:Member){
    return this.http.put(this.baseUrl+'users',member)
  }
}
