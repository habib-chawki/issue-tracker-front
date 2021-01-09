import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CommentBuilder } from 'src/app/models/comment-builder/comment-builder';
import { Comment } from 'src/app/models/comment/comment';

import { CommentService } from './comment.service';

describe('CommentService', () => {
  let httpTestingController: HttpTestingController;
  let commentService: CommentService;

  let comment: Comment;
  const issueId = '100';

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });

    httpTestingController = TestBed.inject(HttpTestingController);
    commentService = TestBed.inject(CommentService);
  });

  beforeEach(() => {
    comment = new CommentBuilder().id('1').content('comment content').build();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(commentService).toBeTruthy();
  });

  it('should create comment', () => {
    // when "createComment()" is called
    commentService
      .createComment(comment.content, issueId)
      .subscribe((response) => {
        expect(response).toEqual(comment);
      });

    // then a post request should be made to create the comment
    const req = httpTestingController.expectOne(
      commentService.baseUrl.replace('{issueId}', issueId)
    );

    expect(req.request.method).toBe('POST');
    expect(req.request.body.content).toBe(comment.content);

    // respond with the created comment
    req.flush(comment);
  });
});
