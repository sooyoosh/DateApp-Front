import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberListComponent } from './member/member-list/member-list.component';
import { MemberDetailComponent } from './member/member-detail/member-detail.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'',runGuardsAndResolvers:'always',canActivate:[authGuard],
    children:[
      {path:'members', component:MemberListComponent},
      {path:'member/:userName', component:MemberDetailComponent},
      {path:'lists', component:ListsComponent},
      {path:'messages', component:MessagesComponent}
    ]
  },
  {path:'**',component:HomeComponent,pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
