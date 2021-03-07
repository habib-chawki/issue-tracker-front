import Board from '../board/board';
import { Issue } from '../issue/issue';

export default interface Sprint {
  id: string;
  name: string;
  goal: string;
  project: string;
  backlog: Issue[];
  board: Board;
  startDate: Date;
  endDate: Date;
}
