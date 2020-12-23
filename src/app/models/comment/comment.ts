import { User } from '../user/user';

export interface Comment {
  owner: User;
  content: string;
  creationTime: Date;
  updateTime: Date;
}
