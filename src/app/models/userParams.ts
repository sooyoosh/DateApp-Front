import { user } from "./user";

export class UserParams {
gender:string;
minAge=18;
maxAge=99;
pageNumber=1;
pageSize=5;
orderBy:string

constructor(user:user|null){
this.gender=user?.gender ==='female'?'male':'female'
}

}