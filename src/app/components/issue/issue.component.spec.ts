import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueComponent } from './issue.component';

describe('IssueComponent', () => {
  let component: IssueComponent;
  let fixture: ComponentFixture<IssueComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IssueComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should render issue details', () => {
    // expect details to be empty at first
    expect(component.details).toEqual({ description: '' });

    // given the new details
    let details = { description: 'This is the issue description' };

    component.details = details;
    fixture.detectChanges();

    // expect details to be rendered
    expect(nativeElement.querySelector('div').textContent).toEqual(
      details.description
    );

    // given updated details
    details = { description: 'This is an updated description' };

    // when issue details are updated
    component.details = details;
    fixture.detectChanges();

    // then expect updated details to be rendered
    expect(nativeElement.querySelector('div').textContent).toEqual(
      details.description
    );
  });

  it('should invoke onClick handler when issue element is clicked', () => {
    spyOn(component, 'onClick');

    // given the issue template element
    const issue = nativeElement.querySelector('div');

    // when it is clicked
    issue.click();

    // then expect the onClick handler to be invoked
    expect(component.onClick).toHaveBeenCalled();
  });

  it('should emit an "issueClicked" event with issue details when issue element is clicked', () => {
    spyOn(component.issueClicked, 'emit');

    // when onClick event handler is invoked
    component.onClick();

    // then expect an event to be emitted with issue details
    expect(component.issueClicked.emit).toHaveBeenCalledWith(component.details);
  });
});
