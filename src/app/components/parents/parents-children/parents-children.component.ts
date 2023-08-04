import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { Children } from 'src/app/models/children.model';
import { Tasks } from 'src/app/models/tasks.model';
import { TasksService } from 'src/app/services/tasks.service';
import { catchError, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-parents-children',
  templateUrl: './parents-children.component.html',
  styleUrls: ['./parents-children.component.css']
})
export class ParentsChildrenComponent implements OnChanges {

  tasks: { [id_children: string]: Tasks[] } = {};
  loading: boolean = false;

  constructor(private tasksService: TasksService) {}

  @Input() children: Children[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['children'] && !changes['children'].firstChange) {
      this.loading = true;
      const observables: Observable<Tasks[]>[] = this.children
        .filter(child => child && child._id)
        .map(child => this.tasksService.getAllByChildrenId(child._id as string));
    }
  }

}
