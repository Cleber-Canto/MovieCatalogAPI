import { User } from '@prisma/client';

declare global {
  namespace Express {
    interface User {
      userId: number;
      username: string;
    }
  }
}
