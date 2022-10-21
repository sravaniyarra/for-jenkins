import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AddnewService {

  constructor(public http : HttpClient) { }
  

  getData(){
    return this.http.get('http://localhost:8000/getdata')
  }
  postData(bodydata){
    console.log('data' , bodydata)
    return this.http.post('http://localhost:8000/postdata',bodydata)
  }
  deleteData(_id){
    return this.http.delete(`http://localhost:8000/delete/${_id}`)
  }
  modifyData(data,id){
    return this.http.put(`http://localhost:8000/modify/${id}`,data)
   }
} 
