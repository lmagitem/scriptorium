import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { PixiService } from './pixi.service';

describe('PixiService', () => {
  let service: PixiService;

  beforeEach(() => {
    class StoreMock {
      select = jasmine.createSpy().and.returnValue(of({}));
      dispatch = jasmine.createSpy();
      pipe = jasmine.createSpy().and.returnValue(of('success'));
    }
    TestBed.configureTestingModule({
      providers: [{ provide: Store, useClass: StoreMock }],
    }).compileComponents();
    service = TestBed.inject(PixiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
