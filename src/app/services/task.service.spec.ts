import { TestBed } from '@angular/core/testing';
import { TaskService } from './task.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { of } from 'rxjs';

// Mock d'AngularFirestore
const angularFirestoreMock = {
  collection: (name: string) => ({
    valueChanges: () => of([]),
    doc: (id: string) => ({
      set: (data: any) => Promise.resolve(),
      update: (data: any) => Promise.resolve(),
      delete: () => Promise.resolve(),
    }),
  }),
};

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TaskService,
        { provide: AngularFirestore, useValue: angularFirestoreMock },
      ],
    });
    service = TestBed.inject(TaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
