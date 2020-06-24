import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListViewService {
  public taskListURL = "http://localhost:3000/";
  constructor(private http: HttpClient) { }
  
  public getTaskList(){
    return this.http.get(this.taskListURL);
  }
}
