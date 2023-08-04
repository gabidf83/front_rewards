import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, switchMap, tap } from 'rxjs';
import { Children } from 'src/app/models/children.model';
import { Rewards } from 'src/app/models/rewards.model';
import { ChildrenService } from 'src/app/services/children.service';
import { RewardsService } from 'src/app/services/rewards.service';

@Component({
  selector: 'app-parents-rewards',
  templateUrl: './parents-rewards.component.html',
  styleUrls: ['./parents-rewards.component.css']
})
export class ParentsRewardsComponent implements OnInit{

  childId: string = '';
  loading: boolean = false;
  children!: Children;
  rewards: Rewards[] = [];

  constructor(
    private route: ActivatedRoute,
    private rewardsService: RewardsService,
    private childrenService: ChildrenService
  ) {}

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
        return this.rewardsService.getAllByChildrenId(this.childId); // Obtener todas las tareas del niño.
      })
    ).subscribe({
      next: (rewardsData: any) => {
        this.rewards = rewardsData.rewardsData as Rewards[]; // Asignar las tareas recibidas al arreglo 'tasks'
        console.log(this.rewards);
      },
      error: (e) => console.error(e)
    });  }

  retrieveChild(id_children: string): Observable<Children> {
    return this.childrenService.get(id_children).pipe(
      map((data: any) => data.existingChildren as Children) // Accedemos a los objetos Children dentro de existingChildren
    );
  }

}
