import { Location } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  async,
  fakeAsync,
  tick,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';

import { ViewComponent } from './view.component';
import { ViewService } from './view.service';
import { mockDeliveries } from './view.service.spec';

class ViewServiceMock {
  getDelivery() {
    return of();
  }
}

describe('ViewComponent', () => {
  let component: ViewComponent;
  let fixture: ComponentFixture<ViewComponent>;
  let viewService: ViewService;
  let location: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewComponent],
      providers: [{ provide: ViewService, useClass: ViewServiceMock }],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'track-deliveries', component: ViewComponent },
        ]),
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewComponent);
    viewService = TestBed.get(ViewService);
    location = TestBed.get(Location);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should receive correct delivery data', () => {
    spyOn(viewService, 'getDelivery').and.returnValue(of(mockDeliveries[0]));
    component.ngOnInit();

    expect(viewService.getDelivery).toHaveBeenCalledTimes(1);
    expect(component.delivery).toEqual(mockDeliveries[0]);
  });

  it('should navigate to back when error', fakeAsync(() => {
    spyOn(viewService, 'getDelivery').and.returnValue(throwError('test'));
    component.ngOnInit();
    tick();
    expect(location.path()).toBe('/track-deliveries');
  }));
});
