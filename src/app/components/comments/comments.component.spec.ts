import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CommentBuilder } from 'src/app/models/comment-builder/comment-builder';
import { Comment } from 'src/app/models/comment/comment';
import { UserBuilder } from 'src/app/models/user-builder/user-builder';
import { CommentComponent } from '../comment/comment.component';

import { CommentsComponent } from './comments.component';

describe('CommentsComponent', () => {
  let component: CommentsComponent;
  let fixture: ComponentFixture<CommentsComponent>;
  let nativeElement: HTMLElement;

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

    // set up a comment
    comment1 = new CommentBuilder()
      .content('comment 1 content')
      .owner(new UserBuilder().username('comment1@owner1').build())
      .build();

    // set up another comment
    comment2 = new CommentBuilder()
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

    fixture.detectChanges();

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

    // the comment components should be rendered
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
});
