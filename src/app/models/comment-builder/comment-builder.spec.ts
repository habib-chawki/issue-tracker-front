import { Comment } from '../comment/comment';
import { UserBuilder } from '../user-builder/user-builder';
import { CommentBuilder } from './comment-builder';

describe('CommentBuilder', () => {
  let comment: Comment;

  beforeEach(() => {
    comment = {
      owner: new UserBuilder()
        .id('111')
        .email('comment.owner@email.com')
        .username('comown')
        .build(),

      content: 'comment content !',
      creationTime: new Date(),
      updateTime: new Date('2021-01-01'),
    };
  });

  fit('should create a comment', () => {
    const createdComment = new CommentBuilder()
      .owner(comment.owner)
      .content(comment.content)
      .creationTime(comment.creationTime)
      .updateTime(comment.updateTime)
      .build();

    expect(createdComment).toEqual(comment);
  });
});
