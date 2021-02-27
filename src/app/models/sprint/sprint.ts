import { Issue } from '../issue/issue';

export default interface Sprint {
  id: string;
  name: string;
  goal: string;
  project: string;
  backlog: Issue[];
  startDate: Date;
  endDate: Date;
}
