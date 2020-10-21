import { Component, OnInit } from '@angular/core';
import { ListViewService } from './list-view.service';
import {MatDialog} from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {
  public taskList: any =[];
  public showLoadingSpinner: boolean = true;
  public finishedTaskList = [];
  constructor(private listViewService: ListViewService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getTaskList();
    
  }
  public getTaskList(){
    this.listViewService.getTaskList().subscribe((taskList: any)=>{
      this.showLoadingSpinner = false;
      this.taskList = taskList.filter((item)=>{
        return item.status == 'new'
      });
      this.finishedTaskList = taskList.filter((item)=>{
        return item.status == 'completed'
      });
    });
  }

  openAddTaskDialog(){
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(newTask => {
      if(newTask){
        this.showLoadingSpinner = true;
        this.listViewService.postNewTask(newTask).subscribe((res)=>{
           this.getTaskList();
        });
      }      
    });
  }

  deleteTask(task){
    this.listViewService.deleteTask(task).subscribe((taskList)=>{
      this.showLoadingSpinner = true;
      this.getTaskList();
    });
  }

  updateTask(task){
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '350px',
      data: task
    });

    dialogRef.afterClosed().subscribe(newTask => {
      if(newTask){
        this.showLoadingSpinner = true;
        this.listViewService.updateTask(newTask).subscribe((res)=>{
          this.getTaskList();
        });
      }      
    });
  }

  finishedTask(task){
    task.status = task.status == "new" ? "completed" : "new";    
    this.listViewService.updateTask(task).subscribe((res)=>{
      this.getTaskList();
    });
  }
}
