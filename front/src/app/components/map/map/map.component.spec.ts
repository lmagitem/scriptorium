import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { BehaviorSubject, of } from 'rxjs';
import { MapComponent } from './map.component';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;
  let htmlElement: HTMLElement;
  let debugElement: DebugElement;
  let storeSelector = new BehaviorSubject<boolean>(true);

  beforeEach(async () => {
    class StoreMock {
      select = jasmine.createSpy().and.returnValue(of({}));
      dispatch = jasmine.createSpy();
      pipe = jasmine.createSpy().and.returnValue(storeSelector.asObservable());
    }
    await TestBed.configureTestingModule({
      declarations: [MapComponent],
      providers: [
        { provide: Store, useClass: StoreMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    htmlElement = fixture.nativeElement;
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('DOM', () => {
    describe('<menu>', () => {
      it('should be displayed', () => {
        expect(
          debugElement.query(By.css('#map-menu')).nativeElement
        ).toBeTruthy();
      });
    });

    describe('<left-panel>', () => {
      it('should be displayed', () => {
        expect(
          debugElement.query(By.css('#map-left-panel')).nativeElement
        ).toBeTruthy();
      });
    });

    describe('<pixi>', () => {
      it('should be displayed', () => {
        expect(
          debugElement.query(By.css('#map-pixi')).nativeElement
        ).toBeTruthy();
      });
    });

    describe('<right-panel>', () => {
      it('should be displayed', () => {
        expect(
          debugElement.query(By.css('#map-right-panel')).nativeElement
        ).toBeTruthy();
      });
    });

    describe('<footer>', () => {
      it('should be displayed', () => {
        expect(
          debugElement.query(By.css('#map-footer')).nativeElement
        ).toBeTruthy();
      });
    });
  });
});
