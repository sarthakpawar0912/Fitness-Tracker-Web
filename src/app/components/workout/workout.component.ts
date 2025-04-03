import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-workout',
  imports: [ CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzSelectModule,
    NzDatePickerModule,
    SharedModule, ],
  templateUrl: './workout.component.html',
  styleUrl: './workout.component.scss'
})
export class WorkoutComponent {

  workoutForm!:FormGroup;

  listOfType:any[]=[
    "Cardio",
    "Strength",
    "Flexibility",
    "HIIT",
    "Pilates",
    "Dance",
    "Swimming",
    "Cycling",
    "Running",
    "Walking",
    "Boxing",
    "CrossFit",
    "Rowing",
    "Stretching",
    "Martial Arts",
    "Gymnatics",
    "Climbing",
    "Polymetrics"
  ];
 
  activities: any;
  workouts:any;

  constructor(private fb:FormBuilder,
    private userService:UserService,
    private message :NzMessageService
  ){}

  ngOnInit(){
    this.workoutForm=this.fb.group({
      type:[null,[Validators.required]],
      duration:[null,[Validators.required]],
      date:[null,[Validators.required]],
      caloriesBurned:[null,[Validators.required]],
    });
    this.getAllWorkouts();
  }

  onSubmit(){
    this.userService.postWorkout(this.workoutForm.value).subscribe(res=>{
      this.message.success("Workout posted Successfuuly",{nzDuration:5000});
      this.workoutForm.reset();
    },error=>{
      this.message.error("Error while posting workout",{nzDuration:5000});
    })
  }

  getAllWorkouts(): void {
    this.userService.getWorkouts().subscribe(
      res => {
        this.workouts = res;
        console.log(this.workouts);
      },
      error => {
        this.message.error('Error while fetching Workouts', { nzDuration: 5000 });
      }
    );
  }

}
