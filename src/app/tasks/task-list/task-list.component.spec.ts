import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListComponent } from './task-list.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { of } from 'rxjs';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Mock d'AngularFirestore
const angularFirestoreMock = {
  collection: (name: string) => ({
    valueChanges: () => of([]),
    doc: (id: string) => ({
      update: (data: any) => Promise.resolve(),
      delete: () => Promise.resolve(),
    }),
  }),
};

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskListComponent,CommonModule, FormsModule], // Ajoutez ici le composant standalone
      providers: [
        { provide: AngularFirestore, useValue: angularFirestoreMock },
        TaskService,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
