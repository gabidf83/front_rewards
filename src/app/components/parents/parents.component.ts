import { Component, OnInit } from '@angular/core';
import { Parents } from 'src/app/models/parents.model';
import { ParentsService } from 'src/app/services/parents.service';

@Component({
  selector: 'app-parents',
  templateUrl: './parents.component.html',
  styleUrls: ['./parents.component.css']
})

export class ParentsComponent implements OnInit{

  parents: Parents[] = [];
  currentParent: Parents = {};
  currentIndex = -1;
  title = '';

  constructor(private parentsService: ParentsService) {}

  ngOnInit(): void {
    this.retrieveParents();
  }

  // retrieveParents(): void {
  //   this.parentsService.getAll().subscribe({
  //     next: (data) => {
  //       this.parents = data;
  //       console.log(data);
  //     },
  //     error: (e) => console.log(e)
  //   });
  // }

  retrieveParents(): void {
    this.parentsService.getAll().subscribe({
      next: (data: any) => {
        // Convierte el JSON a un array de objetos Parents usando Object.values()
        this.parents = Object.values(data);
        console.log(this.parents);
      },
      error: (error) => console.log(error)
    });
  }

  // refreshList(): void {
  //   this.retrieveParents();
  //   this.currentParent = {};
  //   this.currentIndex = -1;
  // }

  // setActiveParents(parents: Parents, index: number): void {
  //   this.currentParent = parents;
  //   this.currentIndex = index;
  // }

  // removeAllParents(): void {
  //   this.parentsService.deleteAll()
  //     .subscribe({
  //       next: (res) => {
  //         console.log(res);
  //         this.refreshList();
  //       },
  //       error: (e) => console.error(e)
  //     });
  // }

  // searchTitle(): void {
  //   this.currentParent = {};
  //   this.currentIndex = -1;

  //   this.parentsService.findByTitle(this.title)
  //     .subscribe({
  //       next: (data) => {
  //         this.parents = data;
  //         console.log(data);
  //       },
  //       error: (e) => console.error(e)
  //     });
  // }

}
