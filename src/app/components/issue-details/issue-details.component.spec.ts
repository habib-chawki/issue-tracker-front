import { asNativeElements } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueDetailsComponent } from './issue-details.component';

describe('IssueDetailsComponent', () => {
  let component: IssueDetailsComponent;
  let fixture: ComponentFixture<IssueDetailsComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IssueDetailsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueDetailsComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render issue details', () => {
    // expect the rendered details to be bound to the model property
    expect(nativeElement.querySelector('div').textContent).toEqual(
      component.details
    );

    // when details are updated
    const details = 'Issue details';
    component.details = details;

    fixture.detectChanges();

    // then the updated details should be rendered
    expect(nativeElement.querySelector('div').textContent).toEqual(details);
  });
});
