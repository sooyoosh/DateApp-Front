import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, map } from 'rxjs';
import { user } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
correntUserSource=new BehaviorSubject<user|null>(null)
currentUser$=this.correntUserSource.asObservable();
  constructor(private http:HttpClient) { }

login(model){
  return this.http.post<user>(environment.apiBaseUrl+'account/login',model).pipe(
    map((res:user)=>{
      const user=res;
      if(user){
        localStorage.setItem('user',JSON.stringify(user))
        this.correntUserSource.next(user)
      }
    })
  )
}
logout(){
  localStorage.removeItem('user')
  this.correntUserSource.next(null)
}

}
