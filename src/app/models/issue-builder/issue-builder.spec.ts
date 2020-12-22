import IssueResolution from '../enums/issue-resolution';
import IssueStatus from '../enums/issue-status';
import IssueType from '../enums/issue-type';
import { Issue } from '../issue/issue';
import { IssueBuilder } from './issue-builder';

let issue: Issue;

beforeEach(() => {
  issue = {
    id: '500',
    key: 'SoldkeMP5sdfE',
    description: 'Desc',
    summary: 'Summary',
    type: IssueType.Story,
    status: IssueStatus.InProgress,
    resolution: IssueResolution.Unresolved,
    assignee: null,
    reporter: null,
    comments: [],
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

  expect(createdIssue).toBe(issue);
});
