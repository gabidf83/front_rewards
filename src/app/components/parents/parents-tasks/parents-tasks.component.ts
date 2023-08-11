import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, catchError, finalize, forkJoin, map, switchMap, tap } from 'rxjs';
import { Children } from 'src/app/models/children.model';
import { Tasks } from 'src/app/models/tasks.model';
import { ChildrenService } from 'src/app/services/children.service';
import { SharedService } from 'src/app/services/shared.service';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-parents-tasks',
  templateUrl: './parents-tasks.component.html',
  template: `<p>{{ parentId }}</p>`,
  styleUrls: ['./parents-tasks.component.css']
})
export class ParentsTasksComponent implements OnInit {

  childId: string = '';
  loading: boolean = false;
  children!: Children;
  tasks: Tasks[] = [];
  selectedTask: Tasks | null = null;
  showAddForm: boolean = false;
  parentId = '';
  newTask: Tasks = {
    task_tasks: '',
    coins_tasks: 0,
    id_parents: this.parentId,
    id_children: this.childId,
    done_tasks: false,
    active_tasks: true
    // Otros campos de la nueva tarea...
  };


  constructor(
    private route: ActivatedRoute,
    private tasksService: TasksService,
    private childrenService: ChildrenService,
    private sharedService: SharedService
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

    this.sharedService.currentMessage.subscribe((parentId) => {
      this.parentId = parentId;
      console.log(this.parentId);
    });

  }
  retrieveChild(id_children: string): Observable<Children> {
    return this.childrenService.get(id_children).pipe(
      map((data: any) => data.existingChildren as Children) // Accedemos a los objetos Children dentro de existingChildren
    );
  }

  addTask() {
    this.showAddForm = true; // Mostrar el formulario de creación al hacer clic en "Agregar"
  }

  saveNewTask() {
    this.newTask.id_children = this.childId;
    this.newTask.id_parents = this.parentId;

    console.log(this.childId);
    console.log(this.parentId);
    console.log(this.newTask);
    // Llama al servicio para crear la nueva tarea en el backend
    this.tasksService.create(this.newTask).subscribe(
      (createdTask: Tasks) => {
        console.log('Nueva tarea creada:', createdTask);
        this.tasks.push(createdTask); // Agrega la nueva tarea a la lista actual de tareas
        this.showAddForm = false; // Oculta el formulario de creación después de guardar
        this.clearNewTask(); // Limpia los campos del formulario de creación
      },
      (error) => {
        console.error('Error al crear la tarea:', error);
        // Puedes manejar el error aquí o mostrar un mensaje al usuario, si es necesario.
      }
    );
  }
  clearNewTask() {
    this.newTask = {
      task_tasks: '',
      coins_tasks: 0,
      active_tasks: true,
      done_tasks: false
      // Otros campos de la nueva tarea...
    };
  }

  cancelAddTask() {
    this.showAddForm = false; // Cancelar y ocultar el formulario de creación
  }

  editTask(task: Tasks) {
    this.selectedTask = task;
  }

  doneTask(task: Tasks) {
    if (task) {
      // Actualizar la propiedad done_tasks localmente al hacer clic en el botón.
      task.done_tasks = !task.done_tasks;
  
      // Realizar el mapeo del objeto seleccionado antes de enviarlo al backend.
      const mappedTask = {
        done_tasks: task.done_tasks,
        // Agregar otros campos relevantes que debas enviar al backend.
      };
  
      // Enviar la solicitud HTTP para actualizar la tarea en el backend (opcional).
      this.tasksService.update(task._id, mappedTask).subscribe(
        (updatedTask: any) => {
          console.log('Tarea actualizada:', updatedTask);
        },
        (error) => {
          console.error('Error al actualizar la tarea:', error);
        }
      );
    }
  }
  
  activeTask(task: Tasks) {
    if (task) {
      // Actualizar la propiedad done_tasks localmente al hacer clic en el botón.
      task.active_tasks = !task.active_tasks;
  
      // Realizar el mapeo del objeto seleccionado antes de enviarlo al backend.
      const mappedTask = {
        active_tasks: task.active_tasks,
        // Agregar otros campos relevantes que debas enviar al backend.
      };
  
      // Enviar la solicitud HTTP para actualizar la tarea en el backend (opcional).
      this.tasksService.update(task._id, mappedTask).subscribe(
        (updatedTask: any) => {
          console.log('Tarea actualizada:', updatedTask);
        },
        (error) => {
          console.error('Error al actualizar la tarea:', error);
        }
      );
    }
  }

  saveTaskChanges() {
    if (this.selectedTask) {
      // Validar que coins_tasks sea un número antes de enviar la solicitud PUT
      if (typeof this.selectedTask.coins_tasks !== 'number') {
        console.error('El valor de coins_tasks no es un número válido.');
        return;
      }

      // Realizar el mapeo del objeto seleccionado antes de enviarlo al backend.
      const mappedTask = {
        task_tasks: this.selectedTask.task_tasks,
        coins_tasks: this.selectedTask.coins_tasks,
        // Agregar otros campos relevantes que debas enviar al backend.
      };

      this.tasksService.update(this.selectedTask._id, mappedTask).subscribe(
        (updatedTask: any) => {
          console.log('Tarea actualizada:', updatedTask);
          this.selectedTask = null;
        },
        (error) => {
          console.error('Error al actualizar la tarea:', error);
        }
      );
    }
  }


  cancelEdit() {
    // Lógica para cancelar la edición y revertir los cambios, si es necesario.
    this.selectedTask = null; // Reiniciar la tarea seleccionada
  }

}