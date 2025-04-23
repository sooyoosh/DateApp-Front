import { Component, OnInit } from '@angular/core';
import { LikesService } from '../services/likes.service';
import { MessageService } from 'primeng/api';
import { Member } from '../models/Member';
import { LikeParams } from '../models/likeParams';
import { PaginationResult } from '../models/pagination';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.css'
})
export class ListsComponent implements OnInit
{
  first: number = 0;
  members:Member[];
  likeParams=new LikeParams();
  paginationResult=new PaginationResult<Member[]>()

constructor(private messagingService:MessageService,private likeService:LikesService){

}

  ngOnInit() {
    this.loadLikeMember();
  }

gettingTitle(){
  switch(this.likeParams.predicate){
    case 'liked':
      return 'Members You Like';
      case 'likedBy':
        return 'Members Who Like You';
        default:
          return 'ba'
  }
}





loadLikeMember(predicate?:string){
  this.likeParams.predicate=predicate?predicate:this.likeParams.predicate
  this.likeService.getUserLikes(this.likeParams).subscribe({
    next:(data)=>{
      this.paginationResult.items=data.body as Member[]
      this.paginationResult.pagination=JSON.parse(data.headers.get('Pagination')!)
    },
    error:(err)=>{

    }
  })
}


onPageChange(event){
  this.likeParams.pageNumber=event.page;
  this.likeParams.pageNumber++;
  this.loadLikeMember();
}




}
