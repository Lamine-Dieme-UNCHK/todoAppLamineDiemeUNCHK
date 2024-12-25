import { Component } from '@angular/core';
import { AddTaskComponent } from './tasks/add-task/add-task.component';
import { TaskListComponent } from './tasks/task-list/task-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AddTaskComponent, TaskListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'to-do-list-app';
}
