import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddTaskComponent } from './add-task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFirestore } from '@angular/fire/compat/firestore';
import { of } from 'rxjs';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';

// Mock d'AngularFirestore
const angularFirestoreMock = {
  collection: (name: string) => ({
    valueChanges: () => of([]),
    doc: (id: string) => ({
      set: (data: any) => Promise.resolve(),
    }),
  }),
};

describe('AddTaskComponent', () => {
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AddTaskComponent,
        FormsModule,
        CommonModule,
        ReactiveFormsModule,
      ], // Import du composant standalone
      providers: [
        { provide: AngularFirestore, useValue: angularFirestoreMock },
        TaskService,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
