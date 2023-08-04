import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentsRewardsComponent } from './parents-rewards.component';

describe('ParentsRewardsComponent', () => {
  let component: ParentsRewardsComponent;
  let fixture: ComponentFixture<ParentsRewardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParentsRewardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParentsRewardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
