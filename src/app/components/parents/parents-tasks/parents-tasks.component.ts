import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, catchError, finalize, forkJoin, map, switchMap, tap } from 'rxjs';
import { Children } from 'src/app/models/children.model';
import { Tasks } from 'src/app/models/tasks.model';
import { ChildrenService } from 'src/app/services/children.service';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-parents-tasks',
  templateUrl: './parents-tasks.component.html',
  styleUrls: ['./parents-tasks.component.css']
})
export class ParentsTasksComponent implements OnInit {

  childId: string = '';
  loading: boolean = false;
  children!: Children;
  tasks: Tasks[] = [];

  constructor(
    private route: ActivatedRoute,
    private tasksService: TasksService,
    private childrenService: ChildrenService
  ) { }

  ngOnInit(): void {
    this.childId = this.route.snapshot.paramMap.get('id') || '';
    console.log(this.childId);

    this.childrenService.get(this.childId).pipe(
      tap((data: any) => {
        this.children = data.existingChildren; // Acceder directamente a 'existingChildren' para obtener el objeto Children
        console.log(data.existingChildren);
      }),
      switchMap(() => {
        console.log(this.childId);
        // Aquí puedes realizar operaciones adicionales que dependen de la respuesta del primer servicio.
        // Por ejemplo, puedes llamar a otro servicio para obtener las tareas de los niños.
        return this.tasksService.getAllByChildrenId(this.childId); // Obtener todas las tareas del niño.
      })
    ).subscribe({
      next: (tasksData: any) => {
        this.tasks = tasksData.tasksData as Tasks[]; // Asignar las tareas recibidas al arreglo 'tasks'
        console.log(this.tasks);
      },
      error: (e) => console.error(e)
    });


    // this.loading = true;
    // const observables: Observable<Tasks[]>[] = this.children
    //   .filter(child => child && child._id)
    //   .map(child => this.tasksService.getAllByChildrenId(child._id as string));

    // forkJoin(observables).pipe(
    //   catchError(error => {
    //     console.error('Error al obtener tareas:', error);
    //     return [];
    //   }),
    //   finalize(() => this.loading = false)
    // ).subscribe(tasksList => {
    //   tasksList.forEach((tasks, index) => {
    //     const childId = this.children[index]._id;
    //     if (childId) { // Asegurarse de que childId no sea undefined
    //       this.tasks[childId] = tasks;
    //       console.log('Tareas de', childId, ':', tasks);
    //     }
    //   });
    // });

  }
  retrieveChild(id_children: string): Observable<Children> {
    return this.childrenService.get(id_children).pipe(
      map((data: any) => data.existingChildren as Children) // Accedemos a los objetos Children dentro de existingChildren
    );
  }

}