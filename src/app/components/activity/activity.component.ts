import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [ 
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzSelectModule,
    NzDatePickerModule,
    SharedModule,
  ],
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})

export class ActivityComponent implements OnInit {
  
   
  activityForm!: FormGroup;
  activities: any[] = [];

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private activityService: UserService
  ) {}

  ngOnInit(): void {
    this.activityForm = this.fb.group({
      caloriesBurned: [null, [Validators.required]],
      steps: [null, [Validators.required]],
      distance: [null, [Validators.required]],
      date: [null, [Validators.required]],
    });
    this.getAllActivities();
  }

  submitForm(): void {
    if (this.activityForm.invalid) {
      this.message.error('Please fill all fields correctly!', { nzDuration: 5000 });
      return;
    }

    this.activityService.postActivity(this.activityForm.value).subscribe(
      res => {
        this.message.success('Activity Posted Successfully', { nzDuration: 5000 });
        this.activityForm.reset();
        this.getAllActivities();
      },
      error => {
        this.message.error('Error while posting Activity', { nzDuration: 5000 });
      }
    );
  }

  getAllActivities(): void {
    this.activityService.getActivites().subscribe(
      res => {
        this.activities = res;
        console.log(this.activities);
      },
      error => {
        this.message.error('Error while fetching Activities', { nzDuration: 5000 });
      }
    );
  }

  // deleteActivity(id: number): void {
  //   this.activityService.deleteActivity(id).subscribe(
  //     res => {
  //       this.message.success('Activity deleted successfully', { nzDuration: 5000 });
  //       this.getAllActivities();
  //     },
  //     error => {
  //       this.message.error('Error while deleting Activity', { nzDuration: 5000 });
  //     }
  //   );
  // }
}