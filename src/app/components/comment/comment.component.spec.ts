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
    expect(component.canRemove()).toBeTrue();
  });

  it('should not render a remove button if the logged-in user is not the comment owner', () => {
    component.comment = comment;

    // when the logged-in user is the comment owner
    spyOn(storageService, 'isUserLoggedIn').and.returnValue(true);
    spyOn(storageService, 'getUserIdentifier').and.returnValue('401');

    fixture.detectChanges();

    // then a remove button should be rendered
    expect(nativeElement.querySelector('button#remove')).toBeFalsy();
    expect(component.canRemove()).toBeFalse();
  });

  it('should invoke "onRemove()" when the remove button is clicked', () => {
    // given the logged-in user is the comment owner
    spyOn(component, 'canRemove').and.returnValue(true);

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
});
