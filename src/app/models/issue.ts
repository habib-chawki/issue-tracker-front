export interface Issue {
  key: string;

  description: string;
  summary: string;

  type: string;
  status: string;
  resolution: string;

  assignee: string;
  reporter: string;

  comments: string[];
  votes: number;
  watchers: string[];

  created: Date;
  updated: Date;
  estimate: Date;
}
