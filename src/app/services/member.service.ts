import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Member } from '../models/Member';
import { of } from 'rxjs';
import { PaginationResult } from '../models/pagination';
import { UserParams } from '../models/userParams';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  baseUrl:any=environment.apiBaseUrl
  members=signal<Member[]|null>([]);//this is for store state
  PaginationResult=signal<PaginationResult<Member[]>|null>(null)

  constructor(private http:HttpClient) { }

  getMembers(userParams:UserParams){
    // set Params
    let params=new HttpParams();
    if(userParams.pageNumber && userParams.pageSize){
      params=params.append("PageNumber",userParams.pageNumber);
      params=params.append("PageSize",userParams.pageSize)
      params=params.append("Gender",userParams.gender)
      params=params.append("MinAge ",userParams.minAge)
      params=params.append("MaxAge",userParams.maxAge)
    }
    if(userParams.orderBy){
      params=params.append("OrderBy",userParams.orderBy)
    }
    // set Params


    return this.http.get<Member[]>(this.baseUrl+'users',{observe:'response',params}).subscribe({
      next:(response)=>{
        this.PaginationResult.set({
          items:response.body as Member[],
          pagination:JSON.parse(response.headers.get('Pagination')!)
        });
        this.members.set(response.body)
      }
    })
  }
  getMemberByUsername(userName){
    const member=this.members()?.find(x=>x.userName==userName);
    if(member!==undefined && member!==null) return of(member);
    return this.http.get<Member>(this.baseUrl+'users/'+userName)
  }
  getMemberByUsernameApi(userName){
    return this.http.get<Member>(this.baseUrl+'users/'+userName)
  }
  updateMember(member:Member){
    return this.http.put(this.baseUrl+'users',member)
  }
  setMainPhoto(photoId){
   return this.http.put(this.baseUrl+`users/set-main-photo/${photoId}`,{})
  }
  deletePhoto(photoId){
    return this.http.delete(this.baseUrl+`users/delete-photo/${photoId}`)
  }
  photoUpload(file){
    return this.http.post(this.baseUrl+`users/photo/upload`,file)
  }

}
