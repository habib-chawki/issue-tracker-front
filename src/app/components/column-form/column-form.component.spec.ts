import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ColumnFormComponent } from './column-form.component';

describe('ColumnFormComponent', () => {
  let component: ColumnFormComponent;
  let fixture: ComponentFixture<ColumnFormComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ColumnFormComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnFormComponent);
    component = fixture.componentInstance;

    nativeElement = fixture.nativeElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render form', () => {
    expect(nativeElement.querySelector('form')).toBeTruthy();
  });

  it('should render column title label', () => {
    expect(
      nativeElement.querySelector('form label[for="title"]').textContent
    ).toBe('Title');
  });

  it('should render input field for column title', () => {
    expect(nativeElement.querySelector('form input#title')).toBeTruthy();
  });

  it('should render "Save" column button', () => {
    expect(nativeElement.querySelector('form button#save').textContent).toBe(
      'Save'
    );
  });

  it('should render "Cancel" form button', () => {
    expect(nativeElement.querySelector('form button#cancel').textContent).toBe(
      'Cancel'
    );
  });

  it('should invoke "onSave()" when "Save" button is clicked', () => {
    // given the "onSave()" handler method
    spyOn(component, 'onSave');

    // given the "Save" form button
    const saveButton: HTMLButtonElement = nativeElement.querySelector(
      'button#save'
    );

    // when the button is clicked
    saveButton.click();

    // then expect "onSave()" to be invoked
    expect(component.onSave).toHaveBeenCalledWith();
  });

  it('should emit "columnFormSaved" event with the form value when "onSave()" is invoked', () => {
    // given the "columnFormSaved" event
    spyOn(component.columnFormSaved, 'emit');

    // given the form value
    const formValue = { title: 'column title' };
    component.columnForm.setValue(formValue);

    // when "onSave()" is called
    component.onSave();

    // then the event should be emitted with the form value
    expect(component.columnFormSaved.emit).toHaveBeenCalledWith(formValue);
  });

  it('should invoke onCancel() when "Cancel" button is clicked', () => {
    // given the "onCancel()" handler method
    spyOn(component, 'onCancel');

    // given the "Cancel" button
    const cancelButton: HTMLButtonElement = nativeElement.querySelector(
      'button#cancel'
    );

    // when the button is clicked
    cancelButton.click();

    // then "onCancel()" shoud be invoked
    expect(component.onCancel).toHaveBeenCalled();
  });

  it('should emit "columnFormCancelled" event when "onCancel()" is invoked', () => {
    // given the "columnFormCancelled" event
    spyOn(component.columnFormCancelled, 'emit');

    // when "onCancel()" is called
    component.onCancel();

    // then the event should be emitted
    expect(component.columnFormCancelled.emit).toHaveBeenCalled();
  });

  it('should set the form value when the form is submitted', () => {
    // given the title input field
    const titleInputField = fixture.debugElement.nativeElement.querySelector(
      'input#title'
    );

    // given the inputted column title
    const title = 'column title';

    titleInputField.value = title;
    titleInputField.dispatchEvent(new Event('input'));

    // then expect the form value to have been set
    expect(component.columnForm.controls['title'].value).toEqual(title);
  });

  it('should invoke "onSave()" when the form is submitted', () => {
    // given the "onSave()" handler method
    spyOn(component, 'onSave');

    // given the submit button
    const submitButton: HTMLButtonElement = nativeElement.querySelector(
      'button#save'
    );

    // when the button is clicked (form is submitted)
    submitButton.click();

    // then "onSave()" should be invoked
    expect(component.onSave).toHaveBeenCalled();
  });
});
