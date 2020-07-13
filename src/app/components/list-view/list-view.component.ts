import { Component, OnInit } from '@angular/core';
import { ListViewService } from './list-view.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {
  public taskList: any =[];
  constructor(private listViewService: ListViewService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getTaskList();
  }
  public getTaskList(){
    this.listViewService.getTaskList().subscribe((taskList)=>{
      this.taskList = taskList;
    });
  }

  openAddTaskDialog(){
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(newTask => {
      if(newTask){
        this.listViewService.postNewTask(newTask).subscribe((res)=>{
          console.log(res)
          this.getTaskList();
        });
      }      
    });
  }

  deleteTask(task){
    console.log(task)
    this.listViewService.deleteTask(task).subscribe((taskList)=>{
      console.log(taskList)
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
        console.log("Updating")
        this.listViewService.updateTask(newTask).subscribe((res)=>{
          console.log(res)
          this.getTaskList();
        });
      }      
    });
  }

}
