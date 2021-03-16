import Board from '../board/board';
import SprintStatus from '../enums/sprint-status';
import { Issue } from '../issue/issue';

export default interface Sprint {
  id: string;
  name: string;
  goal: string;
  projectId: string;
  backlog: Issue[];
  board: Board;
  status: SprintStatus;
  startDate: Date;
  endDate: Date;
}
