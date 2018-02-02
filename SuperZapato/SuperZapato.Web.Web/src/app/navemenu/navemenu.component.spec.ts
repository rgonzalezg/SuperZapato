import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavemenuComponent } from './navemenu.component';

describe('NavemenuComponent', () => {
  let component: NavemenuComponent;
  let fixture: ComponentFixture<NavemenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavemenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavemenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
