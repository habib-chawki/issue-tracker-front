import { CommentBuilder } from '../comment-builder/comment-builder';
import IssuePriority from '../enums/issue-priority';
import IssueResolution from '../enums/issue-resolution';
import IssueStatus from '../enums/issue-status';
import IssueType from '../enums/issue-type';
import { Issue } from '../issue/issue';
import { IssueBuilder } from './issue-builder';

let issue: Issue;

describe('IssueBuilder', () => {
  beforeEach(() => {
    issue = {
      id: '500',
      key: 'SoldkeMP5sdfE',
      description: 'Desc',
      summary: 'Summary',
      priority: IssuePriority.low,
      type: IssueType.Story,
      status: IssueStatus.InProgress,
      resolution: IssueResolution.Unresolved,
      assignee: null,
      reporter: null,
      comments: [
        new CommentBuilder().content('comment1').owner('jon doe').build(),
        new CommentBuilder().content('comment3').owner('joe doe').build(),
      ],
      votes: 0,
      watchers: [],
      creationTime: new Date(),
      updateTime: new Date(),
      estimate: new Date(),
    };
  });

  it('should create an issue', () => {
    const createdIssue: Issue = new IssueBuilder()
      .id(issue.id)
      .key(issue.key)
      .description(issue.description)
      .summary(issue.summary)
      .type(issue.type)
      .status(issue.status)
      .resolution(issue.resolution)
      .assignee(issue.assignee)
      .reporter(issue.reporter)
      .comments(issue.comments)
      .votes(issue.votes)
      .watchers(issue.watchers)
      .creationTime(issue.creationTime)
      .updateTime(issue.updateTime)
      .estimate(issue.estimate)
      .build();

    expect(createdIssue).toEqual(issue);
  });
});
