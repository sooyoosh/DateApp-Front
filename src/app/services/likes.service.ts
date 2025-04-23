import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Member } from '../models/Member';
import { LikeParams } from '../models/likeParams';

@Injectable({
  providedIn: 'root'
})
export class LikesService {
  ApibaseUrl:any=environment.apiBaseUrl;
  likedIds=signal<number[]>([]);
  constructor(private http:HttpClient)
   { }

  toggleLike(targetId){
    return this.http.post(this.ApibaseUrl+`likes/${targetId}`,{});
  }
  getUserLikes(likeparams:LikeParams ){
    let param=new HttpParams();
    param=param.append("predicate",likeparams.predicate);
    param=param.append("PageNumber",likeparams.pageNumber);
    param=param.append("PageSize",likeparams.pageSize);
    return this.http.get<Member[]>(this.ApibaseUrl+`likes`,{observe:'response',params:param});
  }

  getUserLIkeListId(){
    return this.http.get<number[]>(this.ApibaseUrl+`likes/likeList`).subscribe({
      next:(ids)=>{
        this.likedIds.set(ids);
      }
    })
  }
}
