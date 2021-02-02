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

  it('should invoke onSave() when "Save" button is clicked', () => {
    // given the "onSave()" handler method
    spyOn(component, 'onSave');

    // given the "Save" form button
    const saveButton: HTMLButtonElement = nativeElement.querySelector(
      'button#save'
    );

    // when the button is clicked
    saveButton.click();

    // then expect "onSave()" to be invoked
    expect(component.onSave).toHaveBeenCalled();
  });
});
