import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  public addTaskForm: FormGroup;
  public labelOptions = ["Personal", "Health", "Work", "Others"]
  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<AddTaskComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit(): void {
    this.addTaskForm = this.formBuilder.group({
      _id: [this.data ? this.data._id : ''],
      taskName: [this.data ? this.data.taskName : '', Validators.required],
      label: [this.data ? this.data.label :  '', Validators.required],
      duration: [this.data ? this.data.duration : '', Validators.required],
      status: [this.data ? this.data.status : 'new']
    });
  }

  saveTask(){
    this.dialogRef.close(this.addTaskForm.value);
  }
}