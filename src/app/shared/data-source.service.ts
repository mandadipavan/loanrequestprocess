import { Injectable } from '@angular/core';

import {User} from './user.model';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map,tap,take,exhaustMap } from 'rxjs/operators';
import { Subject,BehaviorSubject } from 'rxjs';
import { Observable, throwError } from 'rxjs';
import {LoginUser} from './login-user.model';

@Injectable({
  providedIn: 'root'
})
export class DataSourceService {
  private userId:String="1234";
  userData:User[]=[];
  usersDataChanged = new Subject<User[]>();
  user = new BehaviorSubject<LoginUser>(null as any);

  REST_API: string = 'http://localhost:8083/springboot-flowable-service/process/start';
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json').
                 set('processKey','loanApplicationProcess2');
  constructor(private httpClient:HttpClient) { }
  async addUser(data: User){
    let API_URL = this.REST_API;
    const user = JSON.stringify(data);
    return await this.httpClient.post<User>(API_URL, user,{ headers: this.httpHeaders,responseType:'text' as'json'})
    .pipe(
        tap(
            res=>{
              console.log("User Added Successfully!!");
              console.log(res);
            }
          )
      ).toPromise();
  }
  async fetchReviewUsers(){
      // return await this.httpClient.get<User[]>('http://localhost:8083/springboot-flowable-service/customers/Loan Review',{responseType:'json'})
      return await this.httpClient.get<User[]>('http://localhost:8083/springboot-flowable-service/customers/assignee/'+this.userId,{responseType:'json'})
              .pipe(tap(res=>{
                console.log("fetch operation called review");
                this.userData=res;
                this.usersDataChanged.next(this.userData.slice());
                console.log(res);
              })).toPromise();

      
    }
    getUsers(){
      return this.userData.slice();
    }
    getUserByIndex(index:number){
       return this.userData[index];
    }
    removeUserByIndex(index:number){
      this.userData.splice(index,1);
      this.usersDataChanged.next(this.userData.slice());
    }
  async loanReview(task_id:String,body:any){

   const task_id1:string = task_id?.valueOf();
   console.log("lon review data source and taskid",task_id1);
   const headersLoanApprove = new HttpHeaders().set('Content-Type', 'application/json')
                              .set('taskId',task_id1);
   // const data = {"detailsmissing":false,
   //              "isreviewsuccess":true};
   // const body = JSON.stringify(data);
     return await this.httpClient.put('http://localhost:8083/springboot-flowable-service/task/complete',
                             body,{ headers: headersLoanApprove,responseType:'text' as'json'})
                             .pipe(
                              
                              ).toPromise();                         
   }
   getUserDataLength(){
    return this.userData.length;
   }
   setUserId(userId:String){
      this.userId=userId;
       console.log(this.userId);
    }
    login(userId:String,password:String){
      const user = new LoginUser(userId,password);
      this.user.next(user);
      
      localStorage.setItem('userData',JSON.stringify(user));
    }
    logout(){
    this.user.next(null as any);
    localStorage.removeItem('userData'); 
    }
   autoLogin(){
    console.log("Auto Login Called");
      const userData:{
      userId:string;
      password:string;
    } = JSON.parse(localStorage.getItem('userData') as any);
    console.log("Printion iuser in Auto Login :",userData);
    if(!userData){
      return;
    }
    const loadedUser = new LoginUser(userData.userId,userData.password);
      this.user.next(loadedUser);
  }
  getUserId(){
    return this.userId;
  }
  getFlowDiagram(processInstanceId:String){
    return this.httpClient.get<any>('http://localhost:8083/springboot-flowable-service/process/runtime/process-instances/'+processInstanceId+'/diagram',
      {responseType:'blob' as 'json'});
  }
}
