import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmeDetailRandomComponent } from './filme-detail-random.component';

describe('FilmeDetailRandomComponent', () => {
  let component: FilmeDetailRandomComponent;
  let fixture: ComponentFixture<FilmeDetailRandomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmeDetailRandomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilmeDetailRandomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
