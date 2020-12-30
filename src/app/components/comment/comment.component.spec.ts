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
    owner = new UserBuilder().id('100').username('comment@owner').build();

    // set the comment
    comment = new CommentBuilder()
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
      comment.owner.username
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

  it('should render a "save" button along with the update text field', () => {
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

  fit('should invoke "onConfirmUpdate()" when "Save" button is clicked', () => {
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
});
