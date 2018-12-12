import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html' ,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'MEAN';
  tasks = [];
  task =[];
  number = 0
  newTask: any;


  constructor(private _httpService: HttpService){
    }
    ngOnInit(){
      this.newTask = {title: "", description:""}
      // this.snacks = ["vanilla latte with skim milk", "brushed suede", "cookie"];
      this.getTasksFromService();
    }

    getTasksFromService(){
      let observable = this._httpService.getTasks();
      observable.subscribe( data => {
        console.log("Got our data!", data);
        this.tasks = data['data'];
      })
    }

    clickParam(num: number): void{
      console.log(`Click event is working and the param is ${num}`);
      this.number = num;
      let observable = this._httpService.postToServer({data: num});
      observable.subscribe( data => {console.log('Got the Post Data!', data);

    });

    }

    showTask(id): void{
      console.log('in Show button');
      let observable = this._httpService.showTask(id);
      observable.subscribe(data => {
        console.log('Got a task!', data)
        this.task = data['data'];
      });
    }

    onSubmit(){
      let observable = this._httpService.addTask(this.newTask);
      observable.subscribe(data => {
        console.log('Got data from POST', data);
        this.newTask = {title: "", description:""}
        this.getTasksFromService();
      })
    }

    deleteTask(id){
      let observable = this._httpService.removeTask(id);
      observable.subscribe(data => {
        console.log('deleting!!', data);
        this.task = data = ['data'];
        this.getTasksFromService();
      })
    }

    getDescriptionOnClick(id: String): void {
      this.showTask(id);
      console.log(id);
    }

    updateTask(id, task){

      let observable = this._httpService.updateATask(id, task);
      observable.subscribe(data => {
        console.log("updated a task", data);
        this.getTasksFromService();
    })

   }

}
