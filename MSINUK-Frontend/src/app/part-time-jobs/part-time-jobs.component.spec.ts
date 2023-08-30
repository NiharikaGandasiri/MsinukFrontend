import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartTimeJobsComponent } from './part-time-jobs.component';

describe('PartTimeJobsComponent', () => {
  let component: PartTimeJobsComponent;
  let fixture: ComponentFixture<PartTimeJobsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartTimeJobsComponent]
    });
    fixture = TestBed.createComponent(PartTimeJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
