import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CommentBuilder } from 'src/app/models/comment-builder/comment-builder';
import { Comment } from 'src/app/models/comment/comment';
import { UserBuilder } from 'src/app/models/user-builder/user-builder';
import { User } from 'src/app/models/user/user';
import { StorageService } from 'src/app/services/storage/storage.service';

import { CommentComponent } from './comment.component';

describe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;
  let nativeElement: HTMLElement;

  let storageService: StorageService;

  let comment: Comment;
  let owner: User;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommentComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;

    storageService = TestBed.inject(StorageService);

    fixture.detectChanges();

    // set the comment owner
    owner = new UserBuilder().id('100').userName('comment@owner').build();

    // set the comment
    comment = new CommentBuilder()
      .id('666')
      .owner(owner)
      .content('This is a comment !')
      .build();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should render the comment's owner and content`, () => {
    component.comment = comment;
    fixture.detectChanges();

    // the owner's username should be rendered
    expect(nativeElement.querySelector('li div#owner').textContent).toContain(
      comment.owner.userName
    );

    // the comment's content should be renderd
    expect(nativeElement.querySelector('li div#content').textContent).toContain(
      comment.content
    );
  });

  it('should allow comment modification when the logged-in user is the comment owner', () => {
    // given a comment
    component.comment = comment;

    // when the logged-in user is the owner
    spyOn(storageService, 'isUserLoggedIn').and.returnValue(true);
    spyOn(storageService, 'getUserIdentifier').and.returnValue(
      comment.owner.id
    );

    // then it should return true (can modify comment)
    expect(component.canModify()).toBeTrue();
  });

  it('should disallow comment modification when the logged-in user is not the comment owner', () => {
    // given an issue
    component.comment = comment;

    // when the logged-in user is not the owner
    spyOn(storageService, 'isUserLoggedIn').and.returnValue(true);
    spyOn(storageService, 'getUserIdentifier').and.returnValue('403');

    // then it should return false (can not modify comment)
    expect(component.canModify()).toBeFalse();
  });

  it('should render a remove button if the logged-in user is the comment owner', () => {
    component.comment = comment;

    // when the logged-in user is the comment owner
    spyOn(storageService, 'isUserLoggedIn').and.returnValue(true);
    spyOn(storageService, 'getUserIdentifier').and.returnValue(
      comment.owner.id
    );

    // detect changes to render the remove button
    fixture.detectChanges();

    // then a remove button should be rendered
    expect(nativeElement.querySelector('button#remove')).toBeTruthy();
    expect(nativeElement.querySelector('button#remove').textContent).toContain(
      'Remove'
    );
  });

  it('should not render a remove button if the logged-in user is not the comment owner', () => {
    component.comment = comment;

    // when the logged-in user is the comment owner
    spyOn(storageService, 'isUserLoggedIn').and.returnValue(true);
    spyOn(storageService, 'getUserIdentifier').and.returnValue('401');

    fixture.detectChanges();

    // then a remove button should be rendered
    expect(nativeElement.querySelector('button#remove')).toBeFalsy();
  });

  it('should invoke "onRemove()" when the remove button is clicked', () => {
    // given the logged-in user is the comment owner
    spyOn(component, 'canModify').and.returnValue(true);

    // given the onRemove handler method
    spyOn(component, 'onRemove');

    fixture.detectChanges();

    // given the remove button
    const removeButton: HTMLButtonElement = nativeElement.querySelector(
      'button#remove'
    );

    // when the button is clicked
    removeButton.click();

    // then onRemove should be called
    expect(component.onRemove).toHaveBeenCalled();
  });

  it('should emit a "commentRemoved" event when "onRemove()" is called', () => {
    spyOn(component.commentRemoved, 'emit');

    // when onRemove is called
    component.onRemove();

    // then the 'commentRemoved' event should be fired
    expect(component.commentRemoved.emit).toHaveBeenCalledWith(
      component.comment
    );
  });

  it('should render an update button when the logged-in user is the owner', () => {
    component.comment = comment;

    // when the logged-in user is the comment owner
    spyOn(storageService, 'isUserLoggedIn').and.returnValue(true);
    spyOn(storageService, 'getUserIdentifier').and.returnValue(
      comment.owner.id
    );

    // detect changes to render the update button
    fixture.detectChanges();

    // then an update button should be rendered
    expect(nativeElement.querySelector('button#update')).toBeTruthy();
    expect(nativeElement.querySelector('button#update').textContent).toContain(
      'Update'
    );
  });

  it('should invoke "onUpdate()" handler method when update button is clicked', () => {
    spyOn(component, 'canModify').and.returnValue(true);
    spyOn(component, 'onUpdate');

    fixture.detectChanges();

    // given the update button
    const updateButton: HTMLButtonElement = nativeElement.querySelector(
      'button#update'
    );

    // when the button is clicked
    updateButton.click();

    // then "onUpdate()" should be called
    expect(component.onUpdate).toHaveBeenCalled();
  });

  it('should not render the update text field before "onUpdate()" is called', () => {
    // given a comment
    component.comment = comment;
    fixture.detectChanges();

    // when onUpdate() is not called then the update text field should not be rendered
    expect(nativeElement.querySelector('input#update-field')).toBeFalsy();
  });

  it(`should render the update text field with the comment's content when "onUpdate()" is called`, () => {
    // given the comment to be updated
    component.comment = comment;
    component.onUpdate();

    fixture.detectChanges();

    // when the update field is rendered
    const updateField = fixture.debugElement.query(By.css('input#update-field'))
      .nativeElement;

    // then its value should be the comment content
    expect(updateField.value).toContain(comment.content);
  });

  it('should render a "Save" button along with the update text field to confirm the update', () => {
    // given the comment to be updated
    component.comment = comment;

    // when the update text field is rendered
    component.onUpdate();
    fixture.detectChanges();

    // then a "save" button to confirm the update, should be rendered along with it
    expect(
      nativeElement.querySelector('button#confirm-update').textContent
    ).toContain('Save');
  });

  it('should invoke "onConfirmUpdate()" when "Save" button is clicked', () => {
    // given the comment to be updated
    component.comment = comment;

    // when the update text field is rendered
    component.onUpdate();
    fixture.detectChanges();

    // given the "onConfirmUpdate()" handler method
    spyOn(component, 'onConfirmUpdate');

    // given the "Save" button
    const saveButton: HTMLButtonElement = nativeElement.querySelector(
      'button#confirm-update'
    );

    // when the button is clicked
    saveButton.click();

    // then "onConfirmUpdate()" should be called
    expect(component.onConfirmUpdate).toHaveBeenCalled();
  });

  it('should emit "commentUpdated" event, with updated comment, when "onConfirmUpdate()" is called', () => {
    spyOn(component.commentUpdated, 'emit');

    // given the comment
    component.comment = comment;
    fixture.detectChanges();

    // given the updated comment
    const updatedContent = 'Newest comment content';

    // when onConfirmUpdate() is called
    component.onConfirmUpdate(updatedContent);

    // then a "commentUpdated" event should be emitted with the updated comment
    expect(component.comment.content).toBe(updatedContent);
    expect(component.commentUpdated.emit).toHaveBeenCalledWith(comment);
  });

  it(`should call "onConfirmUpdate()" with the updated content when the "Save" button is clicked`, () => {
    spyOn(component, 'onConfirmUpdate');

    // given the comment to be updated
    component.comment = comment;

    // given the update text field is rendered along with the save and cancel buttons
    component.onUpdate();
    fixture.detectChanges();

    // given the new comment content
    const updatedContent = 'New and improved comment content';

    // given the new comment content is inputted
    const updateField = fixture.debugElement.query(By.css('input#update-field'))
      .nativeElement;
    updateField.value = updatedContent;

    // when the save button is clicked
    const saveButton: HTMLButtonElement = nativeElement.querySelector(
      'button#confirm-update'
    );
    saveButton.click();

    // then "onConfirmUpdate()" should be called with the new comment content
    expect(component.onConfirmUpdate).toHaveBeenCalledWith(updatedContent);
  });

  it('should render a "Cancel" button to cancel the update', () => {
    // given the comment to be updated
    component.comment = comment;

    // when the update text field is rendered
    component.onUpdate();
    fixture.detectChanges();

    // then a "Cancel" button should also be rendered along with it
    expect(
      nativeElement.querySelector('button#cancel-update').textContent
    ).toContain('Cancel');
  });

  it('should invoke "onCancelUpdate()" handler method when "Cancel" button is clicked', () => {
    spyOn(component, 'onCancelUpdate');

    // given the comment to be updated
    component.comment = comment;

    // given the update text field is rendered
    component.onUpdate();
    fixture.detectChanges();

    // given the cancel button
    const cancelButton: HTMLButtonElement = nativeElement.querySelector(
      'button#cancel-update'
    );

    // when the button is clicked
    cancelButton.click();

    // then onCancelUpdate() should be called
    expect(component.onCancelUpdate).toHaveBeenCalled();
  });

  it('should hide update field and show the same comment content when "Cancel" button is clicked', () => {
    // given the comment to be updated
    component.comment = comment;

    // given the update text field is rendered
    component.onUpdate();
    fixture.detectChanges();

    // given the cancel button
    const cancelButton: HTMLButtonElement = nativeElement.querySelector(
      'button#cancel-update'
    );

    // when the button is clicked
    cancelButton.click();
    fixture.detectChanges();

    // then the update field should be hidden and comment content should remain the same
    expect(nativeElement.querySelector('input#update-field')).toBeFalsy();
    expect(nativeElement.querySelector('div#content').textContent).toContain(
      comment.content
    );
  });
});
