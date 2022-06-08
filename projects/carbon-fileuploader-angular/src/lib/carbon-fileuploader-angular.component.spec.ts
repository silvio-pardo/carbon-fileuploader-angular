import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarbonFileuploaderAngularComponent } from './carbon-fileuploader-angular.component';

describe('CarbonFileuploaderAngularComponent', () => {
  let component: CarbonFileuploaderAngularComponent;
  let fixture: ComponentFixture<CarbonFileuploaderAngularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarbonFileuploaderAngularComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarbonFileuploaderAngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
