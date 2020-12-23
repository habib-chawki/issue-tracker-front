import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentBuilder } from 'src/app/models/comment-builder/comment-builder';
import { Comment } from 'src/app/models/comment/comment';
import { UserBuilder } from 'src/app/models/user-builder/user-builder';
import { User } from 'src/app/models/user/user';

import { CommentComponent } from './comment.component';

describe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;
  let nativeElement: HTMLElement;

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

    // the owner username should be rendered
    expect(nativeElement.querySelector('li div#owner').textContent).toBe(
      comment.owner.username
    );

    // the comment content should be renderd
    expect(nativeElement.querySelector('li div#content').textContent).toBe(
      comment.content
    );
  });
});
