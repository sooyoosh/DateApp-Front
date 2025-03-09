import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Member } from '../../models/Member';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrl: './photo-editor.component.css'
})
export class PhotoEditorComponent implements OnInit{
  @Input() member:Member
  @Output() emitMember=new EventEmitter<Member>();
  updateMember:Member
  uploadedFiles: any[] = [];
  constructor(){

  }
  ngOnInit() {
    
  }

  customUpload(event){
    for(let file of event.files) {
      if(file){
        const reader=new FileReader();
        
        reader.onload=(e:any)=>{
          this.updateMember={...this.member}
          this.updateMember.photos.push({id:0,url:e.target.result,isMain:false})
          this.emitMember.emit(this.updateMember)
        }

        reader.readAsDataURL(file)
      }
      
    }

  }

}
