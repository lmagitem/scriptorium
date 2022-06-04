import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { Application } from 'pixi.js';
import { BehaviorSubject, of } from 'rxjs';
import { PixiService } from 'src/app/service/pixi/pixi.service';
import { PixiComponent } from './pixi.component';
import { State } from '../../../store/reducers';
import { PixiState } from 'src/app/store/pixi';

describe('PixiComponent', () => {
  let component: PixiComponent;
  let fixture: ComponentFixture<PixiComponent>;
  let pixiApp: Application;
  let viewportSize: { w: number; h: number };
  let pixiService = {
    initManager: (app: Application) => (pixiApp = app),
    updateAppSize: (w: number, h: number) => {
      if (!!pixiApp) viewportSize = { w, h };
    },
  };
  const initialState = { width: 300, height: 200 };
  let storeSelector = new BehaviorSubject<PixiState>(initialState);

  beforeEach(async () => {
    class StoreMock {
      select = jasmine
        .createSpy()
        .and.returnValue(storeSelector.asObservable());
      dispatch = jasmine.createSpy();
      pipe = jasmine
        .createSpy()
        .and.returnValue(storeSelector.asObservable());
    }
    await TestBed.configureTestingModule({
      declarations: [PixiComponent],
      providers: [
        { provide: Store, useClass: StoreMock },
        { provide: PixiService, useValue: pixiService },
      ],
    }).compileComponents();
    storeSelector.next(initialState);
  });

  beforeEach(() => {
    pixiApp = undefined;
    viewportSize = undefined;
    fixture = TestBed.createComponent(PixiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should launch a proper pixi app', () => {
    expect(pixiApp).toBeTruthy();
  });

  it('should resize pixi app whenever the store updates', () => {
    // Given
    const oldWidth = 300;
    const oldHeight = 200;
    const newWidth = 800;
    const newHeight = 600;

    expect(pixiApp.renderer.width === oldWidth).toBe(true);
    expect(pixiApp.renderer.height === oldHeight).toBe(true);
    expect(viewportSize.w === oldWidth).toBe(true);
    expect(viewportSize.h === oldHeight).toBe(true);

    // When
    window.innerHeight = newHeight;
    storeSelector.next({ width: newWidth, height: newHeight });

    // Then
    expect(pixiApp.renderer.width === newWidth).toBe(true);
    expect(pixiApp.renderer.height === newHeight).toBe(true);
    expect(viewportSize.w === newWidth).toBe(true);
    expect(viewportSize.h === newHeight).toBe(true);
  });
});
