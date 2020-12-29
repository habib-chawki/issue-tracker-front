import { ComponentFixture, TestBed } from '@angular/core/testing';
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

  it('should render a comment with its owner and content', () => {
    component.comment = comment;
    fixture.detectChanges();

    // the owner's username should be rendered
    expect(nativeElement.querySelector('li div#owner').textContent).toBe(
      comment.owner.username
    );

    // the comment's content should be renderd
    expect(nativeElement.querySelector('li div#content').textContent).toBe(
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

  fit('should render text field with comment content when Update button is clicked', () => {
    // should not be rendered at first
    expect(nativeElement.querySelector('input#update-comment')).toBeFalsy();

    // when the update button is clicked
    component.willUpdate = true;
    fixture.detectChanges();

    // then it should be rendered
    expect(nativeElement.querySelector('input#update-comment')).toBeTruthy();
  });

  it('should render text field with comment content when "onUpdate()" is called', () => {
    // given a comment
    component.comment = comment;

    fixture.detectChanges();

    // when "onUpdate()" is called
    component.onUpdate();

    // then a text filed with comment content should be rendered
    expect(
      nativeElement.querySelector('input#update-comment').nodeValue
    ).toContain(comment.content);
  });
});
