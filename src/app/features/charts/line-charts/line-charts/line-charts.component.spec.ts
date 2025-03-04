import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineChartsComponent } from './line-charts.component';

describe('LineChartsComponent', () => {
  let component: LineChartsComponent;
  let fixture: ComponentFixture<LineChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LineChartsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LineChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
