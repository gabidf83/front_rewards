import { Component, OnInit } from '@angular/core';
import { Children } from 'src/app/models/children.model';
import { ChildrenService } from 'src/app/services/children.service';

@Component({
  selector: 'app-children',
  templateUrl: './children.component.html',
  styleUrls: ['./children.component.css']
})
export class ChildrenComponent implements OnInit{

  children: Children[] = [];
  currentChildren: Children = {};
  currentIndex = -1;
  title = '';

  constructor(private childrenService: ChildrenService) {}

  ngOnInit(): void {
    this.retrieveChild();
  }

  retrieveChildren(): void {
    this.childrenService.getAll().subscribe({
      next: (data: any) => {
        // Convierte el JSON a un array de objetos Parents usando Object.values()
        this.children = Object.values(data);
        console.log(this.children);
      },
      error: (error) => console.log(error)
    });
  }

  retrieveChild(): void {
    this.childrenService.get("64abde0f2a13c8cff35415a8").subscribe({
      next: (data: any) => {
        // Convierte el JSON a un array de objetos Children usando Object.values()
        this.children = Object.values(data);
        console.log(this.children);
      },
      error: (error) => console.log(error)
    });
  }

}
