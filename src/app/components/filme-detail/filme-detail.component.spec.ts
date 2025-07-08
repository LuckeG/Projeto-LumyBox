import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmeDetailComponent } from './filme-detail.component';

describe('FilmeDetailComponent', () => {
  let component: FilmeDetailComponent;
  let fixture: ComponentFixture<FilmeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmeDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilmeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
