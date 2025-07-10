import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SerieDetailRandomComponent } from './serie-detail-random.component';

describe('SerieDetailRandomComponent', () => {
  let component: SerieDetailRandomComponent;
  let fixture: ComponentFixture<SerieDetailRandomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SerieDetailRandomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SerieDetailRandomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
