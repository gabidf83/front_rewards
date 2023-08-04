import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentsChildrenComponent } from './parents-children.component';

describe('ParentsChildrenComponent', () => {
  let component: ParentsChildrenComponent;
  let fixture: ComponentFixture<ParentsChildrenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParentsChildrenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParentsChildrenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
