import { Comment } from '../comment/comment';
import IssueResolution from '../enums/issue-resolution';
import IssueStatus from '../enums/issue-status';
import IssueType from '../enums/issue-type';
import { Issue } from '../issue/issue';
import { User } from '../user/user';

export class IssueBuilder {
  private readonly _issue: Issue;

  constructor() {
    this._issue = {
      id: null,
      key: null,
      description: null,
      summary: null,
      type: null,
      status: null,
      resolution: null,
      assignee: null,
      reporter: null,
      comments: null,
      votes: 0,
      watchers: null,
      creationTime: new Date(),
      updateTime: new Date(),
      estimate: new Date(),
    };
  }

  id(id: string): IssueBuilder {
    this._issue.id = id;
    return this;
  }

  key(key: string): IssueBuilder {
    this._issue.key = key;
    return this;
  }

  description(description: string): IssueBuilder {
    this._issue.description = description;
    return this;
  }

  summary(summary: string): IssueBuilder {
    this._issue.summary = summary;
    return this;
  }

  type(type: IssueType): IssueBuilder {
    this._issue.type = type;
    return this;
  }

  status(status: IssueStatus): IssueBuilder {
    this._issue.status = status;
    return this;
  }

  resolution(resolution: IssueResolution): IssueBuilder {
    this._issue.resolution = resolution;
    return this;
  }

  assignee(assignee: User): IssueBuilder {
    this._issue.assignee = assignee;
    return this;
  }
  reporter(reporter: User): IssueBuilder {
    this._issue.reporter = reporter;
    return this;
  }
  comments(comments: Comment[]): IssueBuilder {
    this._issue.comments = comments;
    return this;
  }
  votes(votes: number): IssueBuilder {
    this._issue.votes = votes;
    return this;
  }

  watchers(watchers: string[]): IssueBuilder {
    this._issue.watchers = watchers;
    return this;
  }

  creationTime(creationTime: Date): IssueBuilder {
    this._issue.creationTime = creationTime;
    return this;
  }

  updateTime(updateTime: Date): IssueBuilder {
    this._issue.updateTime = updateTime;
    return this;
  }

  estimate(estimate: Date): IssueBuilder {
    this._issue.estimate = estimate;
    return this;
  }

  build(): Issue {
    return this._issue;
  }
}
