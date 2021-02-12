import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from './app-routing.module';
import { AppComponent } from './app.component';

import { BacklogComponent } from './components/backlog/backlog.component';
import { IssuesComponent } from './components/issues/issues.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let nativeElement: HTMLElement;

  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        ReactiveFormsModule,
        HttpClientTestingModule,
      ],
      declarations: [AppComponent, BacklogComponent, IssuesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    nativeElement = fixture.nativeElement;

    router = TestBed.inject(Router);

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

  it('should redirect from "" to "/signup"', fakeAsync(() => {
    fixture.ngZone.run(() => {
      router.navigateByUrl('').then(() => expect(router.url).toBe('/signup'));
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

  it('should render "BacklogComponent" when navigated to "/backlog"', fakeAsync(() => {
    fixture.ngZone.run(() => {
      router.navigateByUrl('/backlog').then(() => {
        expect(nativeElement.querySelector('app-backlog')).toBeTruthy();
        expect(router.url).toBe('/backlog');
      });
    });
  }));

  it('should render "SignupFormComponent" when navigated to "/signup"', fakeAsync(() => {
    fixture.ngZone.run(() => {
      router.navigateByUrl('/signup').then(() => {
        expect(nativeElement.querySelector('app-signup-form')).toBeTruthy();
        expect(router.url).toBe('/signup');
      });
    });
  }));

  it('should render "LoginFormComponent" when navigated to "/login"', fakeAsync(() => {
    fixture.ngZone.run(() => {
      router.navigateByUrl('/login').then(() => {
        expect(nativeElement.querySelector('app-login-form')).toBeTruthy();
        expect(router.url).toBe('/login');
      });
    });
  }));

  it('should render "BoardComponent" when navigated to "/board"', fakeAsync(() => {
    fixture.ngZone.run(() => {
      router.navigateByUrl('/board').then(() => {
        expect(nativeElement.querySelector('app-board')).toBeTruthy();
        expect(router.url).toBe('/board');
      });
    });
  }));
});
