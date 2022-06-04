import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { BehaviorSubject, of } from 'rxjs';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let storeSelector = new BehaviorSubject<boolean>(true);
  
  beforeEach(async () => {
    class StoreMock {
      select = jasmine.createSpy().and.returnValue(of({}));
      dispatch = jasmine.createSpy();
      pipe = jasmine.createSpy().and.returnValue(storeSelector.asObservable());
    }
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [
        { provide: Store, useClass: StoreMock },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
