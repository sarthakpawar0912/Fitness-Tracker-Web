import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const BASIC_URL = "http://localhost:8080/";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  postActivity(activityDTO: any): Observable<any> {
    return this.http.post(BASIC_URL + "api/activity", activityDTO);
  }

  getActivites(): Observable<any> {
    return this.http.get(BASIC_URL + "api/activities");
  }

  
  postWorkout(workoutDTO: any): Observable<any> {
    return this.http.post(BASIC_URL + "api/workout", workoutDTO);
  }

  getWorkouts(): Observable<any> {
    return this.http.get(BASIC_URL + "api/workouts");
  }

  postGoal(goalDTO: any): Observable<any> {
    return this.http.post(BASIC_URL + "api/goal", goalDTO);
  }

  getGoals(): Observable<any> {
    return this.http.get(BASIC_URL + "api/goals");
  }

  updateGoalStatus(id: number): Observable<any> {
    return this.http.put(BASIC_URL + "api/goal/status/" + id, {});
  }

  getStats(): Observable<any> {
    return this.http.get(BASIC_URL + "api/stats");
  }
  
  getGraphStats(): Observable<any> {
    return this.http.get(BASIC_URL + "api/graphs");
  }
}