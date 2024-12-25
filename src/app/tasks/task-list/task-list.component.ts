import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { Task, TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  editModeTaskId: any | null = null; // ID de la tâche en cours d'édition
  editedTitle: string = ''; // Titre temporaire pour l'édition

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  toggleCompletion(task: Task): void {
    task.completed = !task.completed;
    this.taskService.updateTask(task);
  }

  enableEditMode(task: Task): void {
    if (task.completed) {
      Swal.fire(
        'Info',
        'Cette tâche est terminée et ne peut pas être modifiée.',
        'info'
      );
      return;
    }
    this.editModeTaskId = task.id;
    this.editedTitle = task.title;
  }

  updateTask(task: Task): void {
    if (this.editedTitle.trim()) {
      task.title = this.editedTitle;
      this.taskService.updateTask(task).then(() => {
        Swal.fire('Succès', 'La tâche a été mise à jour !', 'success');
        this.cancelEditMode();
      });
    }
  }

  cancelEditMode(): void {
    this.editModeTaskId = null;
    this.editedTitle = '';
  }

  deleteTask(task: Task): void {
    if (task.completed) {
      Swal.fire(
        'Info',
        'Cette tâche est terminée et ne peut pas être supprimée.',
        'info'
      );
      return;
    }

    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Cette action est irréversible !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer !',
    }).then((result) => {
      if (result.isConfirmed) {
        this.taskService.deleteTask(task.id!).then(() => {
          Swal.fire('Supprimé !', 'Votre tâche a été supprimée.', 'success');
        });
      }
    });
  }
}
