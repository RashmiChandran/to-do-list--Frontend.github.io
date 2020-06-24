import { Component, OnInit } from '@angular/core';
import { ListViewService } from './list-view.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {
  public taskList: any =[];
  constructor(private listViewService: ListViewService) { }

  ngOnInit(): void {
    this.listViewService.getTaskList().subscribe((taskList)=>{
      this.taskList = taskList;
    });
  }

}
