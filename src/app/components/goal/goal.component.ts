import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-goal',
  imports: [ CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzSelectModule,
    NzDatePickerModule,
    SharedModule,],
  templateUrl: './goal.component.html',
  styleUrl: './goal.component.scss'
})
export class GoalComponent {

     
  goalForm!: FormGroup;
  goals: any[] = []; // Ensures it's an array to prevent errors

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private goalService: UserService
  ) {}

  ngOnInit(): void {
    this.goalForm = this.fb.group({
      description: [null, [Validators.required]],
      startDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
    });

    this.getAllGoals(); // Fetch goals on initialization
  }

  submitForm(): void {
    if (this.goalForm.invalid) {
      this.message.error('Please fill all fields correctly!', { nzDuration: 5000 });
      return;
    }

    this.goalService.postGoal(this.goalForm.value).subscribe(
      res => {
        this.message.success('Goal Posted Successfully', { nzDuration: 5000 });
        this.goalForm.reset();
        this.getAllGoals(); // Refresh list after posting
      },
      error => {
        this.message.error('Error while posting Goal', { nzDuration: 5000 });
      }
    );
  }

  getAllGoals(): void {
    this.goalService.getGoals().subscribe(
      res => {
        this.goals = res || []; // Ensures it's always an array
      },
      error => {
        this.message.error('Error while fetching Goals', { nzDuration: 5000 });
      }
    );
  }

  updateStatus(id?: number): void {
    if (!id) {
      this.message.error('Invalid Goal ID', { nzDuration: 5000 });
      return;
    }

    this.goalService.updateGoalStatus(id).subscribe(
      res => {
        this.message.success('Goal Updated Successfully', { nzDuration: 5000 });
        this.getAllGoals(); // Refresh list after updating
      },
      error => {
        this.message.error('Error while updating goal', { nzDuration: 5000 });
        console.error("Update Status Error:", error);
      }
    );
  }
}