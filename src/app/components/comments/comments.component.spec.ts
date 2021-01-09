import { HttpResponse } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Observable, of, Subscription } from 'rxjs';
import { CommentBuilder } from 'src/app/models/comment-builder/comment-builder';
import { Comment } from 'src/app/models/comment/comment';
import { UserBuilder } from 'src/app/models/user-builder/user-builder';
import { CommentService } from 'src/app/services/comment/comment.service';
import { CommentComponent } from '../comment/comment.component';

import { CommentsComponent } from './comments.component';

describe('CommentsComponent', () => {
  let component: CommentsComponent;
  let fixture: ComponentFixture<CommentsComponent>;
  let nativeElement: HTMLElement;

  let commentService: CommentService;

  let comment1: Comment, comment2: Comment;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommentsComponent, CommentComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;

    fixture.detectChanges();

    commentService = TestBed.inject(CommentService);

    // set up a comment
    comment1 = new CommentBuilder()
      .id('01')
      .content('comment 1 content')
      .owner(new UserBuilder().username('comment1@owner1').build())
      .build();

    // set up another comment
    comment2 = new CommentBuilder()
      .id('02')
      .content('comment 2 content')
      .owner(new UserBuilder().username('comment2@owner2').build())
      .build();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a list of comments', () => {
    component.comments = [comment1, comment2];
    fixture.detectChanges();

    // all the comments in the list should be rendered
    expect(nativeElement.querySelectorAll('ul app-comment').length).toBe(
      component.comments.length
    );
  });

  it('should invoke "onRemoveComment()" handler method when "commentRemoved" event is received', () => {
    spyOn(component, 'onRemoveComment');

    // given a list of comments
    component.comments = [comment1, comment2];
    fixture.detectChanges();

    // when a commentRemoved event is triggered
    const commentElement: DebugElement = fixture.debugElement.query(
      By.css('app-comment')
    );
    commentElement.triggerEventHandler('commentRemoved', comment2);

    // then onRemoveComment should be called
    expect(component.onRemoveComment).toHaveBeenCalledWith(comment2);
  });

  it('should remove the comment from the comments list when "onRemoveComment()" is invoked', () => {
    // given a list of comments
    component.comments = [comment1, comment2];

    // the comment should have been added to the list
    expect(component.comments).toContain(comment2);

    // when "onRemoveComment()" is called
    component.onRemoveComment(comment2);

    // then the comment should be removed from the list
    expect(component.comments).not.toContain(comment2);
  });

  it('should remove the comment component when "onRemoveComment()" is called', () => {
    // given a list of comments
    component.comments = [comment1, comment2];
    fixture.detectChanges();

    // given the list size
    const commentsListSize = component.comments.length;

    // the comment components should have been rendered
    expect(nativeElement.querySelectorAll('app-comment').length).toBe(
      commentsListSize
    );

    // when "onRemoveComment()" is called
    component.onRemoveComment(comment1);
    fixture.detectChanges();

    // then the comment component should be removed
    expect(nativeElement.querySelectorAll('app-comment').length).toBe(
      commentsListSize - 1
    );
  });

  it('should call "onUpdateComment()" handler method when "commentUpdated" event is received', () => {
    spyOn(component, 'onUpdateComment');

    // given a list of comments
    component.comments = [comment1, comment2];
    fixture.detectChanges();

    // when a "commentUpdated" event is triggered
    const commentElement: DebugElement = fixture.debugElement.query(
      By.css('app-comment')
    );
    commentElement.triggerEventHandler('commentUpdated', comment2);

    // then the "onUpdateComment()" handler method should be called
    expect(component.onUpdateComment).toHaveBeenCalledWith(comment2);
  });

  it('should update comment content when "onUpdateComment()" is called', () => {
    // given a list of comments
    component.comments = [comment1, comment2];
    fixture.detectChanges();

    // given the updated comment
    const updatedComment: Comment = {
      ...comment1,
      content: 'updated comment content ?',
    };

    // when "onUpdateComment()" is called with the updated comment
    component.onUpdateComment(updatedComment);

    // then the comment should be updated in the list of comments
    expect(component.comments).toContain(updatedComment);
    expect(component.comments).not.toContain(comment1);
  });

  it('should render a text field and a button for adding comments', () => {
    expect(nativeElement.querySelector('input#comment')).toBeTruthy();
    expect(
      nativeElement.querySelector('button#add-comment').textContent
    ).toContain('Comment');
  });

  it('should invoke "onCreateComment()" when the "Comment" button is clicked', () => {
    // given the "onCreateComment()" handler method
    spyOn(component, 'onCreateComment');

    // given a new comment
    const newComment = 'the new comment !';

    // given the Comment input field
    const commentInputField = fixture.debugElement.nativeElement.querySelector(
      'input#comment'
    );
    commentInputField.value = newComment;

    // given the Comment button
    const commentButton: HTMLButtonElement = nativeElement.querySelector(
      'button#add-comment'
    );

    // when the button is clicked
    commentButton.click();

    // then "onCreateComment()" should be called with the new comment
    expect(component.onCreateComment).toHaveBeenCalledWith(newComment);
  });

  it('should invoke "commentService#createComment()" when "onCreateComment()" is called', () => {
    component.observable = new Observable();
    spyOn(component.observable, 'subscribe');

    spyOn(commentService, 'createComment').and.returnValue(
      component.observable
    );

    // given a new comment content and the issue id
    const newCommentContent = 'my new comment';
    const issueId = '100';

    // when onCreateComment() is called
    component.onCreateComment(newCommentContent);

    // then "commentService#createComment()" should be invoked
    expect(commentService.createComment).toHaveBeenCalledWith(
      newCommentContent,
      issueId
    );
  });

  it('should invoke "handleCreateComment()" within "onCreateComment()" to create the comment', () => {
    spyOn(commentService, 'createComment').and.returnValue(of(comment1));
    spyOn(component, 'handleCreateComment');

    // when onCreateComment() is called
    component.onCreateComment('new comment');

    // then handleCreateComment() should be invoked
    expect(component.handleCreateComment).toHaveBeenCalled();
  });

  it('should add the new comment to the list of comments when "handleCreateComment()" is called', () => {
    // given the list of comments
    component.comments = [comment1];

    // when "handleCreateComment()" is called
    component.handleCreateComment(comment2);

    // then the new comment should be added to the list of comments
    expect(component.comments).toContain(comment2);
  });

  it('should unsubscribe when the component is destroyed', () => {
    component.subscription = new Subscription();
    spyOn(component.subscription, 'unsubscribe');

    // when the component is destroyed
    component.ngOnDestroy();

    // then expect to unsubscribe from all subscriptions
    expect(component.subscription.unsubscribe).toHaveBeenCalled();
  });
});
