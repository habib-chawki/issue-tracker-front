import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnFormComponent } from './column-form.component';

describe('ColumnFormComponent', () => {
  let component: ColumnFormComponent;
  let fixture: ComponentFixture<ColumnFormComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ColumnFormComponent],
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

  it('should render column title label', () => {
    expect(nativeElement.querySelector('label[for="title"]').textContent).toBe(
      'Title'
    );
  });

  it('should render input field for column title', () => {
    expect(nativeElement.querySelector('input#title')).toBeTruthy();
  });

  it('should render "Save" column button', () => {
    expect(nativeElement.querySelector('button#save').textContent).toBe('Save');
  });

  it('should render "Cancel" form button', () => {
    expect(nativeElement.querySelector('button#cancel').textContent).toBe(
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
});
