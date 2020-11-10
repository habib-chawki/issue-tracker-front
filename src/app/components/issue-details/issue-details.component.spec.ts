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

  fit('should render issue details', () => {
    expect(nativeElement.querySelector('div').textContent).toEqual(
      component.details
    );
  });
});
