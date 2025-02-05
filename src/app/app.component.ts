import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment.development';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'the-dating-app';
  users:any
  constructor(private http:HttpClient){}

  ngOnInit() {
    this.getUsers()
  }

  getUsers(){
    this.http.get(environment.apiBaseUrl+'users').subscribe({
      next:(res)=>{
        
      },
      error:()=>{

      }
    })
  }
}
