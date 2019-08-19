import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinuxAppComponent } from './linux-app.component';

describe('LinuxAppComponent', () => {
  let component: LinuxAppComponent;
  let fixture: ComponentFixture<LinuxAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinuxAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinuxAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
