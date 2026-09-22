import { Router } from 'express';

import { authenticate } from '../middlewares/authenticate';
import { authorize } from '../middlewares/authorize';

import {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
} from '../controllers/user.controller';

const userRouter = Router();

userRouter.post(
  '/',
  authenticate,
  authorize('ADMIN'),
  createUser
);

userRouter.get(
  '/',
  authenticate,
  authorize('ADMIN'),
  getAllUsers
);

userRouter.get(
  '/:id',
  authenticate,
  authorize('ADMIN'),
  getUserById
);

userRouter.patch(
  '/:id',
  authenticate,
  authorize('ADMIN'),
  updateUser
);

userRouter.delete(
  '/:id',
  authenticate,
  authorize('ADMIN'),
  deleteUser
);

export default userRouter;