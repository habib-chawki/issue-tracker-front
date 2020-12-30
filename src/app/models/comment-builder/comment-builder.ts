import { Comment } from '../comment/comment';

export class CommentBuilder {
  private _comment: Comment;

  constructor() {
    this._comment = {
      id: '',
      owner: null,
      content: '',
      creationTime: new Date(),
      updateTime: new Date(),
    };
  }

  id(id): CommentBuilder {
    this._comment.id = id;
    return this;
  }

  owner(owner): CommentBuilder {
    this._comment.owner = owner;
    return this;
  }

  content(content): CommentBuilder {
    this._comment.content = content;
    return this;
  }

  creationTime(creationTime): CommentBuilder {
    this._comment.creationTime = creationTime;
    return this;
  }

  updateTime(updateTime): CommentBuilder {
    this._comment.updateTime = updateTime;
    return this;
  }

  build(): Comment {
    return this._comment;
  }
}
