import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AccountService } from '../services/account.service';

@Directive({
  selector: '[appHasrole]'
})
export class HasroleDirective implements OnInit {


  @Input() appHasrole:string[]=[]
  roles: any;
  constructor(private accountService:AccountService
    ,private viewContainerRef:ViewContainerRef,private templateRef:TemplateRef<any>
  ) { }
  ngOnInit() {
    this.accountService.roles$.subscribe((data)=>{
      if(data!=null)this.roles=data
    })
    if(this.roles?.some(x=>this.appHasrole.includes(x))){
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }else{
      this.viewContainerRef.clear();
    }
    
  }

}
