import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  BaseURL  : string = 'http://localhost:5000';

  constructor(private http : HttpClient) { }
  
  // Post API :
  createUser(data: any) : Observable<any>{
    return this.http.post(`${this.BaseURL}`,data);
  }

  // Get API :
  getAllUsers(){
    return this.http.get(`${this.BaseURL}`);
  }


  // Get Single Data API :
  getUserById(id:any) {
    return this.http.get(`${this.BaseURL}/${id}`);
  }

  // Put API : 
  updateUser(data : any){
    return this.http.put(`${this.BaseURL}/edit/${data._id}`,data);
  }

  // Delete API :
  deleteUser(id:any){
    return this.http.delete(`${this.BaseURL}/${id}`);
  }
}
