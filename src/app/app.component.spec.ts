import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from './app-routing.module';
import { AppComponent } from './app.component';

import { Backlog } from './components/backlog/backlog.component';
import { IssuesComponent } from './components/issues/issues.component';

fdescribe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let nativeElement: HTMLElement;

  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        ReactiveFormsModule,
        HttpClientTestingModule,
      ],
      declarations: [AppComponent, Backlog, IssuesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    nativeElement = fixture.nativeElement;

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'issue-tracker'`, () => {
    expect(app.title).toEqual('issue-tracker');
  });

  it('should render title', () => {
    expect(nativeElement.querySelector('h1').textContent).toContain(
      'App is running'
    );
  });

  it('should redirect from "" to "/backlog"', fakeAsync(() => {
    fixture.ngZone.run(() => {
      router
        .navigateByUrl('')
        .then(() => expect(location.path()).toBe('/backlog'));
    });
  }));

  it('should render "BacklogComponent" when app first loads', fakeAsync(() => {
    fixture.ngZone.run(() => {
      router
        .navigateByUrl('')
        .then(() =>
          expect(nativeElement.querySelector('app-backlog')).toBeTruthy()
        );
    });
  }));

  it('should navigate to "/backlog"', fakeAsync(() => {
    fixture.ngZone.run(() => {
      router
        .navigateByUrl('/backlog')
        .then(() => expect(location.path()).toBe('/backlog'));
    });
  }));

  it('should render "BacklogComponent" when navigated to "/backlog"', fakeAsync(() => {
    fixture.ngZone.run(() => {
      router
        .navigateByUrl('/backlog')
        .then(() =>
          expect(nativeElement.querySelector('app-backlog')).toBeTruthy()
        );
    });
  }));

  it('should navigate to "/signup"', fakeAsync(() => {
    fixture.ngZone.run(() => {
      router
        .navigateByUrl('/signup')
        .then(() => expect(location.path()).toBe('/signup'));
    });
  }));

  it('should render "SignupFormComponent" when navigated to "/signup"', fakeAsync(() => {
    fixture.ngZone.run(() => {
      router
        .navigateByUrl('/signup')
        .then(() =>
          expect(nativeElement.querySelector('app-signup-form')).toBeTruthy()
        );
    });
  }));

  it('should navigate to "/login"', fakeAsync(() => {
    fixture.ngZone.run(() => {
      router
        .navigateByUrl('/login')
        .then(() => expect(location.path()).toBe('/login'));
    });
  }));

  it('should render "LoginFormComponent" when navigated to "/login"', fakeAsync(() => {
    fixture.ngZone.run(() => {
      router
        .navigateByUrl('/login')
        .then(() =>
          expect(nativeElement.querySelector('app-login-form')).toBeTruthy()
        );
    });
  }));
});
