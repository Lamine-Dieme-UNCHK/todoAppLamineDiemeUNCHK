import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

export interface Task {
  id?: string; // Identifiant généré par Firebase
  title: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private collectionName = 'tasks';

  constructor(private firestore: AngularFirestore) {}

  // Récupérer toutes les tâches
  getTasks(): Observable<Task[]> {
    return this.firestore
      .collection<Task>(this.collectionName)
      .valueChanges({ idField: 'id' });
  }

  // Ajouter une nouvelle tâche
  addTask(task: Task): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore
      .collection(this.collectionName)
      .doc(id)
      .set({ ...task, id });
  }

  // Modifier une tâche existante
  updateTask(task: Task): Promise<void> {
    return this.firestore
      .collection(this.collectionName)
      .doc(task.id)
      .update(task);
  }

  // Supprimer une tâche
  deleteTask(id: string): Promise<void> {
    return this.firestore.collection(this.collectionName).doc(id).delete();
  }
}
