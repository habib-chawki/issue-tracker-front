import { User } from '../user/user';

export interface Comment {
  id: string;
  owner: User;
  content: string;
  creationTime: Date;
  updateTime: Date;
}
