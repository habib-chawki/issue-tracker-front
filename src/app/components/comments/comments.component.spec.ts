import { ComponentFixture, TestBed } from '@angular/core/testing';
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
});
