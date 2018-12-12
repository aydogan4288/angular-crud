import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) {
      // this.getTasks();
   }
   getTasks(){
     // let tempObservable = this._http.get('/tasks');
     // // tempObservable.subscribe(data => console.log('Got our tasks!', data));
     // return tempObservable;
     return this._http.get('/tasks');
   }
   postToServer(num){
     return this._http.post('/tasks', num);
   }
   showTask(id){
     return this._http.get(`/tasks/${id}`);
   }
   addTask(newTask){
     return this._http.post('/tasks', newTask);
   }
   removeTask(id){
     return this._http.delete(`/tasks/${id}`);
   }
   updateATask(id, task){
     return this._http.put(`/tasks/${id}/`, task);
   }

};
