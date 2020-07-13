import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListViewService {
  public taskListURL = "http://localhost:3000/";
  public addNewTaskURL = "http://localhost:3000/addTask";
  public deleteTaskURL = "http://localhost:3000/deleteTask/";
  public updateTaskURL = "http://localhost:3000/updateTask/";
  constructor(private http: HttpClient) { }
  
  public getTaskList(){
    return this.http.get(this.taskListURL);
  }

  public postNewTask(newTask){
    return this.http.post(this.addNewTaskURL, newTask);
  }

  public deleteTask(task){
    let httpParams = new HttpParams().set('_id', task._id);
    let options =  {params: httpParams};
    return this.http.delete(this.deleteTaskURL, options);
  }

  public updateTask(task){
    return this.http.put(this.updateTaskURL, task);
  }
}
