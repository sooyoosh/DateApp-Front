import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, map } from 'rxjs';
import { user } from '../models/user';
import { LikesService } from './likes.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
correntUserSource=new BehaviorSubject<user|null>(null)
currentUser$=this.correntUserSource.asObservable();
roles=new BehaviorSubject<any|null>(null);
roles$=this.roles.asObservable();
  constructor(private http:HttpClient,private likeService:LikesService) { }

login(model){
  return this.http.post<user>(environment.apiBaseUrl+'account/login',model).pipe(
    map((res:user)=>{
      const user=res;
      if(user){
        localStorage.setItem('user',JSON.stringify(user))
        this.correntUserSource.next(user)
        this.likeService.getUserLIkeListId();
        this.roles.next(this.gettingRoles(user.token))
      }
    })
  )
}
register(model){
  return this.http.post<user>(environment.apiBaseUrl+'account/register',model).pipe(
    map((res:user)=>{
      const user=res;
      if(user){
        localStorage.setItem('user',JSON.stringify(user))
        this.correntUserSource.next(user);
        this.likeService.getUserLIkeListId();
      }
      return user;
    })
  )
}
logout(){
  localStorage.removeItem('user')
  this.correntUserSource.next(null)
}
curentUserValue(){
  return this.correntUserSource.value;
}
//gettingRoles
gettingRoles(token:string){
  if(!token) return []
  try{
    const payload=JSON.parse(atob(token.split('.')[1]));
    const roles=payload.role;
    return Array.isArray(roles)?roles:[roles];

  }catch(err){
    console.log('invalid token',err);
    return[];
  }
}
//gettingRoles

}
