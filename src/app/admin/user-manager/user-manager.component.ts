import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { user } from '../../models/user';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrl: './user-manager.component.css'
})
export class UserManagerComponent implements OnInit {
  users:user[];
  editDialog:boolean=false;
  user: user;
  selectedRoles:any[]=[];
  availableRoles=['Admin','Moderator','Member'];
  constructor(private adminService:AdminService,private messageService:MessageService){}
  
  ngOnInit() {
    this.getUserWithRoles();
  }


  getUserWithRoles(){
    this.adminService.GetUserRoles().subscribe({
      next:(res)=>{
        this.users=res
      },
      error:(err)=>{

      }
    })
  }

initalEditDialog(item){
  this.user=item;
  this.selectedRoles=[]
  this.selectedRoles=item.roles
  this.editDialog=true;
}

updateRoles(){
  this.adminService.UpdateRoles(this.user.username,this.selectedRoles).subscribe({
    next:(res:any)=>{
      this.messageService.add({ key: 'toast1', severity: 'success', summary: '', detail:'updated' });
      this.editDialog=false;
      this.getUserWithRoles();
    },
    error:(err)=>{
      this.messageService.add({ key: 'toast1', severity: 'error', summary: '', detail:'fail' });
      this.editDialog=false; 
    }
  })
}
}
