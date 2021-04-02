import { Comment } from '../comment/comment';
import { UserBuilder } from '../user-builder/user-builder';
import { CommentBuilder } from './comment-builder';

describe('CommentBuilder', () => {
  let comment: Comment;

  beforeEach(() => {
    comment = {
      id: '666',
      owner: new UserBuilder()
        .id('111')
        .fullName('comment.owner@email.com')
        .userName('comown')
        .build(),

      content: 'comment content !',
      creationTime: new Date(),
      updateTime: new Date('2021-01-01'),
    };
  });

  it('should create a comment', () => {
    const createdComment = new CommentBuilder()
      .id(comment.id)
      .owner(comment.owner)
      .content(comment.content)
      .creationTime(comment.creationTime)
      .updateTime(comment.updateTime)
      .build();

    expect(createdComment).toEqual(comment);
  });
});
