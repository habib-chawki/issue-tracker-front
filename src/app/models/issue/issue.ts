import IssueType from '../enums/issue-type';
import IssueStatus from '../enums/issue-status';
import IssueResolution from '../enums/issue-resolution';
import { User } from '../user/user';

export interface Issue {
  id: string;

  key: string;

  description?: string;
  summary: string;

  type: IssueType;
  status: IssueStatus;
  resolution: IssueResolution;

  assignee?: User;
  reporter: User;

  comments?: string[];
  votes?: number;
  watchers?: string[];

  creationTime: Date;
  updateTime: Date;
  estimate: Date;
}
