import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment as env } from '../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class ListViewService {
  public taskListURL = env.url;
  public addNewTaskURL = env.url + "addTask";
  public deleteTaskURL = env.url + "deleteTask/";
  public updateTaskURL = env.url + "updateTask/";
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
