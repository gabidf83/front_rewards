import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, forkJoin, map } from 'rxjs';
import { Children } from 'src/app/models/children.model';
import { Parents } from 'src/app/models/parents.model';
import { Tasks } from 'src/app/models/tasks.model';
import { ChildrenService } from 'src/app/services/children.service';
import { ParentsService } from 'src/app/services/parents.service';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-parents',
  templateUrl: './parents.component.html',
  styleUrls: ['./parents.component.css']
})

export class ParentsComponent implements OnInit{

  parents: Parents[] = [];
  children: Children[] = [];
  tasks: Tasks[] = [];
  parentId: string = '';

  constructor(
    private parentsService: ParentsService,
    private childrenService: ChildrenService,
    private activatedRoute: ActivatedRoute
    ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.parentId = params['id'];
    });
    this.retrieveParent(this.parentId);
  }

  retrieveParent(parentId: string): void {
    this.parentsService.get(parentId).subscribe({
      next: (data: any) => {
        this.parents = Object.values(data);
        
        // Obtener los datos de los hijos usando forkJoin para esperar todas las solicitudes a la vez
        const childObservables: Observable<Children>[] = [];
        this.parents.forEach(element => {
          if (element.id_children && element.id_children.length > 0) {
            element.id_children.forEach(childId => {
              childObservables.push(this.retrieveChild(childId));
            });
          }
        });
  
        forkJoin(childObservables).subscribe(childrenData => {
          // childrenData contendrá un array de datos de hijos que corresponden al orden en que se solicitaron
          this.children = childrenData.flat(); // Aplanamos el array de arrays en uno solo
          console.log(this.parents);
          console.log(this.children);
        });
      },
      error: (error) => console.log(error)
    });
  }
  
  retrieveChild(id_children: string): Observable<Children> {
    return this.childrenService.get(id_children).pipe(
      map((data: any) => data.existingChildren as Children) // Accedemos a los objetos Children dentro de existingChildren
    );
  }

}
