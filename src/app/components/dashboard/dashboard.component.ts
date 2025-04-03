import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { SharedModule } from '../../shared/shared.module';
import { UserService } from '../../services/user.service';

import Chart,{CategoryScale} from 'chart.js/auto';
import { DatePipe } from '@angular/common';

Chart.register(CategoryScale);
@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzSelectModule,
    NzDatePickerModule,
    SharedModule,],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers:[DatePipe]
})// dashboard.component.ts
export class DashboardComponent {
  
  statsData: any = {};
  workouts: any[] = [];
  activities: any[] = [];
  private workoutChart: Chart | null = null;
  private activityChart: Chart | null = null;

  @ViewChild('workoutLineChart', { static: false }) private workoutLineChart!: ElementRef;
  @ViewChild('activityLineChart', { static: false }) private activityLineChart!: ElementRef;

  constructor(
    private statsService: UserService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.getStats();
    this.getGraphStats();
  }

  getStats() {
    this.statsService.getStats().subscribe((res) => {
      console.log('Stats:', res);
      this.statsData = res;
    });
  }

  getGraphStats() {
    this.statsService.getGraphStats().subscribe((res) => {
      this.workouts = res.workouts || [];
      this.activities = res.activities || [];
      console.log('Workouts:', this.workouts, 'Activities:', this.activities);

      setTimeout(() => {
        this.createLineChart();
      }, 500);
    });
  }

  ngAfterViewInit() {
    // Delay execution slightly to allow charts to properly initialize
    setTimeout(() => {
      if (this.workouts.length && this.activities.length) {
        this.createLineChart();
      }
    }, 500);
  }

  createLineChart() {
    if (!this.workoutLineChart || !this.activityLineChart) {
      console.error('Chart elements not found');
      return;
    }

    if (this.workoutChart) {
      this.workoutChart.destroy();
    }
    if (this.activityChart) {
      this.activityChart.destroy();
    }

    const workoutCtx = this.workoutLineChart.nativeElement.getContext('2d');
    const activityCtx = this.activityLineChart.nativeElement.getContext('2d');

    if (!workoutCtx || !activityCtx) {
      console.error('Chart contexts not found');
      return;
    }

    this.workoutChart = new Chart(workoutCtx, {
      type: 'line',
      data: {
        labels: this.activities.map((data) =>
          this.datePipe.transform(data.date, 'MM/dd')
        ),
        datasets: [
          {
            label: 'Calories Burned',
            data: this.activities.map((data) => data.caloriesBurned),
            fill: false,
            borderWidth: 2,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(0, 139, 139, 1)',
          },
          {
            label: 'Steps',
            data: this.activities.map((data) => data.steps),
            fill: false,
            borderWidth: 2,
            backgroundColor: 'rgba(255, 159, 64, 0.6)',
            borderColor: 'rgba(230, 115, 0, 1)',
          },
          {
            label: 'Distance',
            data: this.activities.map((data) => data.distance),
            fill: false,
            borderWidth: 2,
            backgroundColor: 'rgba(139,0,139,0.6)',
            borderColor: 'rgba(139,0,139,1)',
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        maintainAspectRatio: false,
      },
    });

    this.activityChart = new Chart(activityCtx, {
      type: 'line',
      data: {
        labels: this.workouts.map((data) =>
          this.datePipe.transform(data.date, 'MM/dd')
        ),
        datasets: [
          {
            label: 'Calories Burned',
            data: this.workouts.map((data) => data.caloriesBurned),
            fill: false,
            borderWidth: 2,
            backgroundColor: 'rgba(80,200,120,0.6)',
            borderColor: 'rgba(0,100,0,1)',
          },
          {
            label: 'Duration',
            data: this.workouts.map((data) => data.duration),
            fill: false,
            borderWidth: 2,
            backgroundColor: 'rgba(120,180,200,0.6)',
            borderColor: 'rgba(0,100,150,1)',
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        maintainAspectRatio: false,
      },
    });
  }
}