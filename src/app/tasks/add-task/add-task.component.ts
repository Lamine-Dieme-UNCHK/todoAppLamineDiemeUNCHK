import { Component, OnInit } from '@angular/core';
import { Task, TaskService } from '../../services/task.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-task',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  taskForm: FormGroup;
  editMode = false; // Mode d'édition
  currentTaskId: string | null = null;

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {}

  submitTask(): void {
    if (this.taskForm.valid) {
      const task: Task = {
        title: this.taskForm.value.title,
        completed: false, // Par défaut, la tâche est non terminée
      };

      if (this.editMode && this.currentTaskId) {
        task.id = this.currentTaskId;
        this.taskService.updateTask(task).then(() => {
          Swal.fire('Succès', 'La tâche a été mise à jour !', 'success');
          this.resetForm();
        });
      } else {
        this.taskService.addTask(task).then(() => {
          Swal.fire('Succès', 'Nouvelle tâche ajoutée !', 'success');
          this.resetForm();
        });
      }
    }
  }

  resetForm(): void {
    this.taskForm.reset();
    this.editMode = false;
    this.currentTaskId = null;
  }

  loadTaskForEdit(task: Task): void {
    if (task.completed) {
      Swal.fire(
        'Info',
        'Cette tâche est terminée et ne peut pas être modifiée.',
        'info'
      );
      return;
    }

    this.taskForm.patchValue({ title: task.title });
    this.editMode = true;
    this.currentTaskId = task.id || null;
  }
}
