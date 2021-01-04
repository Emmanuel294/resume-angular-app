import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumesviewComponent } from './resumesview.component';

describe('ResumesviewComponent', () => {
  let component: ResumesviewComponent;
  let fixture: ComponentFixture<ResumesviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumesviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumesviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
