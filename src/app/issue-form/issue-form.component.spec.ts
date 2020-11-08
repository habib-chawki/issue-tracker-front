import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { IssueFormComponent } from './issue-form.component';

describe('IssueFormComponent', () => {
  let component: IssueFormComponent;
  let fixture: ComponentFixture<IssueFormComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssueFormComponent ], 
      imports: [ ReactiveFormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueFormComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a form with a text input and a submit button', () => {
    expect(nativeElement.querySelector('form input#description')).toBeTruthy();
    expect(nativeElement.querySelector('form button[type="submit"]').innerHTML).toContain('Add issue');
  });

  fit('should invoke onSubmit when form is submitted', () => {
    spyOn(component, "onSubmit").and.callThrough();

    const submitButton: HTMLElement = nativeElement.querySelector('form button[type="submit"]');
    submitButton.click();

    expect(component.onSubmit).toHaveBeenCalled();
  });

});
