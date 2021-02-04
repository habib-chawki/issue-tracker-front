import Column from '../column/column';

interface Board {
  id: string;
  name: string;
  columns: Column[];
}

export default Board;
