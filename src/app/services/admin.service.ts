import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpParams } from '@angular/common/http';
import { user } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
ApibaseUrl:any=environment.apiBaseUrl;

  constructor(private http:HttpClient) { }


  GetUserRoles(){
    return this.http.get<user[]>(this.ApibaseUrl+'admin/get-roles')
  }
  UpdateRoles(username,roles){
    let params=new HttpParams();
    params=params.append("roles",roles)
    return this.http.post(this.ApibaseUrl+`admin/edit-roles/${username}`,{},{params})
  }
}
