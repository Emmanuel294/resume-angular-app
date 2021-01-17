import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolviewComponent } from './toolview.component';

describe('ToolviewComponent', () => {
  let component: ToolviewComponent;
  let fixture: ComponentFixture<ToolviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
