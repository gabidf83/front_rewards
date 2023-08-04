import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentsTasksComponent } from './parents-tasks.component';

describe('ParentsTasksComponent', () => {
  let component: ParentsTasksComponent;
  let fixture: ComponentFixture<ParentsTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParentsTasksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParentsTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
