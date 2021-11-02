import { createUser, updateUsername } from '../test-utils/functions-with-context';
import {  mockCtx, ctx } from '../test-utils/setup';

test('should create new user ', async () => {
  const user = {
    id: 1,
    firstName: 'Test',
    lastName: 'Test',
    email: 'hello@prisma.io',
    password: '123456'
  }
  mockCtx.prisma.user.create.mockResolvedValue(user)

  await expect(createUser(user, ctx)).resolves.toEqual(user)
})

test('should update a users name ', async () => {
  const updatedUser = {
    id: 1,
    firstName: 'Rich',
    email: 'hello@prisma.io',
    lastName: 'Test',
    password: '123456'
  };

  mockCtx.prisma.user.update.mockResolvedValue(updatedUser)

  await expect(updateUsername(updatedUser, ctx)).resolves.toEqual(updatedUser)
}) 

