import { Router } from 'express';

import {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
} from '../controllers/user.controller';

const userRouter = Router();

userRouter.post('/', createUser);

userRouter.get('/', getAllUsers);

userRouter.get('/:id', getUserById);

userRouter.patch('/:id', updateUser);

userRouter.delete('/:id', deleteUser);

export default userRouter;