import { User } from '../models/User';

interface CreateUserData {
  name: string;
  email: string;
  passwordHash: string;
  role: 'TEACHER' | 'ADMIN';
}

interface UpdateUserData {
  name?: string;
  email?: string;
  role?: 'TEACHER' | 'ADMIN';
}

export async function createUser(data: CreateUserData) {
  return User.create(data);
}

export async function findUserById(id: string) {
  return User.findById(id);
}

export async function findAllUsers() {
  return User.find().sort({
    createdAt: -1,
  });
}

export async function findUserByEmail(email: string) {
  return User.findOne({
    email,
  });
}

export async function updateUser(
  id: string,
  data: UpdateUserData
) {
  return User.findByIdAndUpdate(
    id,
    data,
    {
      returnDocument: 'after',
      runValidators: true,
    }
  );
}

export async function deleteUser(id: string) {
  return User.findByIdAndDelete(id);
}