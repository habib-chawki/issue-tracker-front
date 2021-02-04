import { Issue } from '../issue/issue';

interface Column {
  id: string;
  title: string;
  issues: Issue[];
}

export default Column;
