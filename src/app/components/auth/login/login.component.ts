import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importa HttpClient
import { ParentsService } from 'src/app/services/parents.service';
import { ChildrenService } from 'src/app/services/children.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  parentUsername: string = '';
  parentPassword: string = '';

  childUsername: string = '';
  childPassword: string = '';

  constructor(
    private http: HttpClient,
    private parentsService: ParentsService,
    private childrenService: ChildrenService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) {} // Inyecta HttpClient

  parentLogin() {
    const credentials = {
      username_parents: this.parentUsername,
      password_parents: this.parentPassword
    };

    this.parentsService.parentLogin(credentials).subscribe(
      parent => {
        // Successfully logged in, you can access parent._id here
        console.log('Parent login successful:', parent);
        const parentId = parent._id;
        console.log(parentId);
        this.router.navigate(['/parents', parentId]);
      },
      error => {
        console.error('Parent login error:', error);
      }
    );
  }

  childLogin() {
    const credentials = {
      username_children: this.childUsername,
      password_children: this.childPassword
    };

    this.childrenService.childrenLogin(credentials).subscribe(
      children => {
        // Successfully logged in, you can access children._id here
        console.log('Children login successful:', children);
        const childrenId = children._id;
        console.log(childrenId);
        this.router.navigate(['/children', childrenId]);
      },
      error => {
        console.error('Children login error:', error);
      }
    );
  }
}
