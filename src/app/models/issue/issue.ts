import IssueType from '../enums/issue-type';
import IssueStatus from '../enums/issue-status';
import { User } from '../user/user';
import { Comment } from '../comment/comment';
import IssuePriority from '../enums/issue-priority';

export interface Issue {
  id: string;

  description?: string;
  summary: string;

  priority: IssuePriority;
  type: IssueType;
  status: IssueStatus;

  points: number;

  assignee: User;
  reporter: User;

  comments?: Comment[];

  creationTime: Date;
  updateTime: Date;
}
